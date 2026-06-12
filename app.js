'use strict';

let chords = [];

// ── Name resolver ────────────────────────────────────────────────────────────

function normalize(str) {
  return str.trim().toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/♯/g, '#')
    .replace(/♭/g, 'b')
    .replace(/sharp/g, '#')
    .replace(/flat/g, 'b');
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/#/g, 'sharp')
    .replace(/\s+/g, '');
}

function findChord(query) {
  if (!query) return null;
  const q = normalize(query);
  return chords.find(c => {
    if (normalize(c.name) === q) return true;
    if (slugify(c.name) === q.replace(/\s/g, '')) return true;
    return c.aliases.some(a => normalize(a) === q || a === q.replace(/\s/g, ''));
  }) || null;
}

// ── SVG Renderer ─────────────────────────────────────────────────────────────

function renderDiagram(chord) {
  const W = 200, H = 240;
  const STRINGS = 4;
  const FRETS_SHOWN = 5;
  const NUT_Y = 52;
  const NUT_H = 6;
  const LEFT = 36;
  const RIGHT = W - 20;
  const BOTTOM = H - 24;
  const STRING_GAP = (RIGHT - LEFT) / (STRINGS - 1);
  const FRET_GAP = (BOTTOM - NUT_Y - NUT_H) / FRETS_SHOWN;
  const DOT_R = 11;

  const baseFret = chord.baseFret || 1;
  const isOpenPosition = baseFret === 1;

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="chord-diagram" aria-label="${chord.name} chord diagram">`;

  // Fret position label if above nut
  if (!isOpenPosition) {
    svg += `<text x="${LEFT - 4}" y="${NUT_Y + NUT_H + FRET_GAP * 0.65}" text-anchor="end" class="fret-label">${baseFret}fr</text>`;
  }

  // Nut or top fret line
  if (isOpenPosition) {
    svg += `<rect x="${LEFT - 2}" y="${NUT_Y}" width="${RIGHT - LEFT + 4}" height="${NUT_H}" rx="2" class="nut"/>`;
  } else {
    svg += `<line x1="${LEFT}" y1="${NUT_Y}" x2="${RIGHT}" y2="${NUT_Y}" class="fret-line top-fret"/>`;
  }

  // Fret lines
  for (let f = 0; f <= FRETS_SHOWN; f++) {
    const y = NUT_Y + NUT_H + f * FRET_GAP;
    svg += `<line x1="${LEFT}" y1="${y}" x2="${RIGHT}" y2="${y}" class="fret-line"/>`;
  }

  // String lines
  for (let s = 0; s < STRINGS; s++) {
    const x = LEFT + s * STRING_GAP;
    svg += `<line x1="${x}" y1="${NUT_Y}" x2="${x}" y2="${BOTTOM}" class="string-line"/>`;
  }

  // String labels (G C E A)
  const stringNames = ['G', 'C', 'E', 'A'];
  for (let s = 0; s < STRINGS; s++) {
    const x = LEFT + s * STRING_GAP;
    svg += `<text x="${x}" y="${H - 4}" text-anchor="middle" class="string-label">${stringNames[s]}</text>`;
  }

  // Dots and open/muted markers
  for (let s = 0; s < STRINGS; s++) {
    const x = LEFT + s * STRING_GAP;
    const fret = chord.frets[s];

    if (fret === null || fret === 'x') {
      // Muted string — X above nut
      svg += `<text x="${x}" y="${NUT_Y - 8}" text-anchor="middle" class="mute-marker">✕</text>`;
    } else if (fret === 0) {
      // Open string — circle above nut
      svg += `<circle cx="${x}" cy="${NUT_Y - 10}" r="7" class="open-marker"/>`;
    } else {
      // Fretted dot
      const relFret = fret - baseFret + 1;
      const cy = NUT_Y + NUT_H + (relFret - 0.5) * FRET_GAP;
      svg += `<circle cx="${x}" cy="${cy}" r="${DOT_R}" class="dot"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

// ── Chord grid ────────────────────────────────────────────────────────────────

const TYPE_ORDER = ['major', '7th', 'maj7', 'minor'];
const TYPE_LABELS = { major: 'Major', '7th': 'Dominant 7th', maj7: 'Major 7th', minor: 'Minor' };

function buildGrid() {
  const grid = document.getElementById('chord-grid');
  if (!grid) return;

  TYPE_ORDER.forEach(type => {
    const group = chords.filter(c => c.type === type);
    if (!group.length) return;

    const section = document.createElement('div');
    section.className = 'grid-section';

    const heading = document.createElement('h3');
    heading.className = 'grid-heading';
    heading.textContent = TYPE_LABELS[type];
    section.appendChild(heading);

    const row = document.createElement('div');
    row.className = 'grid-row';

    group.forEach(chord => {
      const btn = document.createElement('button');
      btn.className = 'chord-btn';
      btn.textContent = chord.name;
      btn.setAttribute('aria-label', `Show ${chord.name} chord`);
      btn.addEventListener('click', () => showChord(chord));
      row.appendChild(btn);
    });

    section.appendChild(row);
    grid.appendChild(section);
  });
}

// ── Display ───────────────────────────────────────────────────────────────────

function showChord(chord) {
  const display = document.getElementById('chord-display');
  const label = document.getElementById('chord-label');
  const diagram = document.getElementById('chord-diagram');

  label.textContent = chord.name;
  diagram.innerHTML = renderDiagram(chord);
  display.hidden = false;
  display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Highlight active button
  document.querySelectorAll('.chord-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === chord.name);
  });
}

function showNotFound(query) {
  const display = document.getElementById('chord-display');
  const label = document.getElementById('chord-label');
  const diagram = document.getElementById('chord-diagram');

  label.textContent = `"${query}" not found`;
  diagram.innerHTML = '<p class="not-found-msg">Try a different spelling — e.g. <strong>F#m</strong>, <strong>Bbmaj7</strong>, <strong>Eb7</strong></p>';
  display.hidden = false;

  document.querySelectorAll('.chord-btn').forEach(b => b.classList.remove('active'));
}

// ── Input handling ────────────────────────────────────────────────────────────

function handleSearch(query) {
  query = query.trim();
  if (!query) return;
  const chord = findChord(query);
  if (chord) showChord(chord);
  else showNotFound(query);
}

// ── Hash routing ──────────────────────────────────────────────────────────────

function resolveHash() {
  const hash = decodeURIComponent(window.location.hash.slice(2)); // strip /#/
  if (!hash) return;
  const chord = findChord(hash);
  if (chord) showChord(chord);
  else showNotFound(hash);
}

// ── Init ──────────────────────────────────────────────────────────────────────

async function init() {
  try {
    const res = await fetch('/chords.json');
    chords = await res.json();
  } catch {
    document.getElementById('chord-grid').innerHTML = '<p class="error">Could not load chord data.</p>';
    return;
  }

  buildGrid();

  const input = document.getElementById('chord-input');
  const form = document.getElementById('search-form');

  form.addEventListener('submit', e => {
    e.preventDefault();
    handleSearch(input.value);
    input.blur();
  });

  resolveHash();
  window.addEventListener('hashchange', resolveHash);
}

document.addEventListener('DOMContentLoaded', init);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}
