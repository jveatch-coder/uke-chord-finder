#!/usr/bin/env node
// Validates every chord in chords.json against music theory:
// the pitch classes produced by the fretted strings must exactly
// equal the chord's tone set (root + intervals), with no extras
// and nothing missing. GCEA tenor tuning.
'use strict';

const fs = require('fs');
const path = require('path');

const TUNING = [7, 0, 4, 9]; // G C E A as pitch classes
const NOTE_PC = { c: 0, 'c#': 1, db: 1, d: 2, 'd#': 3, eb: 3, e: 4, f: 5, 'f#': 6, gb: 6, g: 7, 'g#': 8, ab: 8, a: 9, 'a#': 10, bb: 10, b: 11 };
const INTERVALS = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  '7th': [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
};

function rootOf(name) {
  const m = name.toLowerCase().match(/^([a-g][#b]?)/);
  return NOTE_PC[m[1]];
}

function toneSet(chord) {
  const root = rootOf(chord.name);
  return new Set(INTERVALS[chord.type].map(i => (root + i) % 12));
}

function pitchClasses(frets) {
  const out = [];
  for (let s = 0; s < 4; s++) {
    const f = frets[s];
    if (f === null || f === 'x') continue;
    out.push((TUNING[s] + f) % 12);
  }
  return out;
}

function check(chord, frets) {
  const want = toneSet(chord);
  const got = pitchClasses(frets);
  const gotSet = new Set(got);
  const missing = [...want].filter(pc => !gotSet.has(pc));
  const extra = [...gotSet].filter(pc => !want.has(pc));
  // Allow triads to be complete; allow 7th-type chords to omit the 5th
  // (a standard, real-world voicing compromise on 4 strings).
  const fifth = (rootOf(chord.name) + 7) % 12;
  const missingAllowed = missing.filter(pc => !(INTERVALS[chord.type].length === 4 && pc === fifth));
  return { ok: missingAllowed.length === 0 && extra.length === 0, missing, extra };
}

const file = path.join(__dirname, '..', 'chords.json');
const chords = JSON.parse(fs.readFileSync(file, 'utf8'));

const NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const pcName = pc => NAMES[pc];

let fails = 0;
for (const chord of chords) {
  const res = check(chord, chord.frets);
  if (!res.ok) {
    fails++;
    console.log(`FAIL  ${chord.name.padEnd(8)} frets [${chord.frets}]  missing: [${res.missing.map(pcName)}]  extra: [${res.extra.map(pcName)}]`);
  }
  if (chord.variations) {
    chord.variations.forEach((v, i) => {
      const r = check(chord, v.frets);
      if (!r.ok) {
        fails++;
        console.log(`FAIL  ${chord.name} var${i + 1} frets [${v.frets}]  missing: [${r.missing.map(pcName)}]  extra: [${r.extra.map(pcName)}]`);
      }
      // Label/diagram consistency: variations must be closed (no open
      // strings) and baseFret must equal the lowest fret, so the pill
      // label always matches the number the diagram prints.
      const hasOpen = v.frets.some(f => f === 0 || f === null || f === 'x');
      const minF = Math.min(...v.frets.filter(f => typeof f === 'number' && f > 0));
      if (hasOpen) {
        fails++;
        console.log(`FAIL  ${chord.name} var${i + 1} has an open/muted string — not a movable up-the-neck voicing`);
      } else if (v.baseFret !== minF) {
        fails++;
        console.log(`FAIL  ${chord.name} var${i + 1} baseFret ${v.baseFret} != lowest fret ${minF} (label would mismatch diagram)`);
      }
    });
  }
}

console.log(fails === 0
  ? `PASS — all ${chords.length} chords (and variations) are theoretically correct.`
  : `\n${fails} failure(s).`);
process.exit(fails ? 1 : 0);
