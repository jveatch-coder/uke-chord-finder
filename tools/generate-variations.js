#!/usr/bin/env node
// Generates up-the-neck variations for every chord in chords.json.
// A candidate voicing is accepted only if its pitch classes exactly
// cover the chord's tone set (no extras, nothing missing — no omitted
// fifths here, full chords only), so every variation is a real chord
// by construction. Picks the best playable voicing in three position
// bands: low (0-4), mid (4-8), high (8-12).
'use strict';

const fs = require('fs');
const path = require('path');

const TUNING = [7, 0, 4, 9]; // G C E A
const NOTE_PC = { c: 0, 'c#': 1, db: 1, d: 2, 'd#': 3, eb: 3, e: 4, f: 5, 'f#': 6, gb: 6, g: 7, 'g#': 8, ab: 8, a: 9, 'a#': 10, bb: 10, b: 11 };
const INTERVALS = { major: [0, 4, 7], minor: [0, 3, 7], '7th': [0, 4, 7, 10], maj7: [0, 4, 7, 11] };
const MAX_FRET = 12;
const MAX_SPAN = 3; // max - min across fretted (non-open) strings

function rootOf(name) {
  return NOTE_PC[name.toLowerCase().match(/^([a-g][#b]?)/)[1]];
}

function toneSet(chord) {
  const root = rootOf(chord.name);
  return new Set(INTERVALS[chord.type].map(i => (root + i) % 12));
}

function isValid(frets, want) {
  const got = new Set(frets.map((f, s) => (TUNING[s] + f) % 12));
  if (got.size !== want.size) return false;
  for (const pc of got) if (!want.has(pc)) return false;
  return true;
}

function playability(frets) {
  const fretted = frets.filter(f => f > 0);
  const span = fretted.length ? Math.max(...fretted) - Math.min(...fretted) : 0;
  // Lower is better: prefer fewer fretted strings, tighter span, lower position
  return fretted.length * 2 + span * 3 + Math.max(0, ...fretted) * 0.5;
}

function candidates(chord) {
  const want = toneSet(chord);
  const out = [];
  for (let a = 0; a <= MAX_FRET; a++)
    for (let b = 0; b <= MAX_FRET; b++)
      for (let c = 0; c <= MAX_FRET; c++)
        for (let d = 0; d <= MAX_FRET; d++) {
          const frets = [a, b, c, d];
          const fretted = frets.filter(f => f > 0);
          if (fretted.length) {
            const span = Math.max(...fretted) - Math.min(...fretted);
            if (span > MAX_SPAN) continue;
            // open strings mixed with high positions are unplayable in practice
            if (frets.some(f => f === 0) && Math.min(...fretted) > 4) continue;
          }
          if (isValid(frets, want)) out.push(frets);
        }
  return out;
}

function pickVariations(chord, all) {
  const primaryKey = chord.frets.join(',');
  const bands = [[0, 4], [4, 8], [8, 12]];
  const picked = [];
  for (const [lo, hi] of bands) {
    const inBand = all.filter(f => {
      const fretted = f.filter(x => x > 0);
      const pos = fretted.length ? Math.min(...fretted) : 0;
      return pos >= lo && pos < hi && f.join(',') !== primaryKey &&
        !picked.some(p => p.join(',') === f.join(','));
    });
    if (!inBand.length) continue;
    inBand.sort((x, y) => playability(x) - playability(y));
    picked.push(inBand[0]);
  }
  return picked.map(frets => {
    const fretted = frets.filter(f => f > 0);
    const maxF = fretted.length ? Math.max(...fretted) : 0;
    const minF = fretted.length ? Math.min(...fretted) : 1;
    return { frets, baseFret: maxF > 5 ? minF : 1 };
  });
}

const file = path.join(__dirname, '..', 'chords.json');
const chords = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const chord of chords) {
  chord.variations = pickVariations(chord, candidates(chord));
  console.log(`${chord.name.padEnd(8)} +${chord.variations.length} variations: ${chord.variations.map(v => `[${v.frets}]${v.baseFret > 1 ? `@${v.baseFret}` : ''}`).join('  ')}`);
}

fs.writeFileSync(file, JSON.stringify(chords, null, 2) + '\n');
console.log(`\nWrote ${file}`);
