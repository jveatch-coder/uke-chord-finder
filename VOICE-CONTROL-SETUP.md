# Hands-Free Voice — Voice Control Setup (offline, per-chord)

This gives you **true "say the chord, see the diagram"** — fully offline, inside
your phone, no internet, no Siri network dependency. It works because **iOS Voice
Control does the listening on-device** and just opens the app to the right chord.
Every URL below is fixed and pre-verified, so there's nothing for speech to
mangle.

> **Verified:** all 48 deep links resolve to the correct chord (checked against
> the live app). The URLs contain no `#`-symbol or spaces, so they can't break.

---

## One-time phone setup

1. **Settings → Accessibility → Voice Control → Set Up Voice Control** → download
   the language files (this is what makes it work **offline**).
2. Turn **Voice Control ON** when you want hands-free (or add it to the
   Accessibility Shortcut: triple-click the side button to toggle).

> Note: Voice Control is a full accessibility mode (it can show numbered overlays
> and listens continuously). Toggle it on for practice, off otherwise. If you'd
> rather a single always-available phrase that just opens the app, use the
> **Vocal Shortcut** option at the bottom instead.

---

## How to add ONE chord (the pattern — repeat per chord)

**A. Make the shortcut** (opens the app to that chord):
1. Shortcuts app → **+** → **Add Action** → **Open URLs**
2. Paste the chord's URL from the table below (e.g. `…/#/fsharpm`)
3. Name it the chord (e.g. **F#m**) → **Done**

**B. Make the Voice Control command** (the spoken trigger):
1. Settings → Accessibility → **Voice Control → Customize Commands → Create New Command**
2. **Phrase:** the spoken text from the table (e.g. *F sharp minor*)
3. **Action:** **Run Shortcut** → pick the shortcut from step A
4. Save

Now, with Voice Control on, saying *"F sharp minor"* opens the app to F#m. The
chord opens in your browser tab, served from the offline cache — works in
airplane mode.

> **Tip — do the hard ones first.** You don't have to build all 48 in one sitting.
> Start with the chords you actually blank on mid-song (often F#m, Bb, Bbm, Ebm,
> and the maj7 shapes), then add the rest as needed.

---

## All 48 commands

| Chord | Say this | Shortcut opens this URL |
|---|---|---|
| C | "C major" | `https://uke-chord-finder.vercel.app/#/c` |
| C# | "C sharp major" | `https://uke-chord-finder.vercel.app/#/csharp` |
| D | "D major" | `https://uke-chord-finder.vercel.app/#/d` |
| Eb | "E flat major" | `https://uke-chord-finder.vercel.app/#/eflat` |
| E | "E major" | `https://uke-chord-finder.vercel.app/#/e` |
| F | "F major" | `https://uke-chord-finder.vercel.app/#/f` |
| F# | "F sharp major" | `https://uke-chord-finder.vercel.app/#/fsharp` |
| G | "G major" | `https://uke-chord-finder.vercel.app/#/g` |
| Ab | "A flat major" | `https://uke-chord-finder.vercel.app/#/aflat` |
| A | "A major" | `https://uke-chord-finder.vercel.app/#/a` |
| Bb | "B flat major" | `https://uke-chord-finder.vercel.app/#/bflat` |
| B | "B major" | `https://uke-chord-finder.vercel.app/#/b` |
| C7 | "C seven" | `https://uke-chord-finder.vercel.app/#/c7` |
| C#7 | "C sharp seven" | `https://uke-chord-finder.vercel.app/#/csharp7` |
| D7 | "D seven" | `https://uke-chord-finder.vercel.app/#/d7` |
| Eb7 | "E flat seven" | `https://uke-chord-finder.vercel.app/#/eflat7` |
| E7 | "E seven" | `https://uke-chord-finder.vercel.app/#/e7` |
| F7 | "F seven" | `https://uke-chord-finder.vercel.app/#/f7` |
| F#7 | "F sharp seven" | `https://uke-chord-finder.vercel.app/#/fsharp7` |
| G7 | "G seven" | `https://uke-chord-finder.vercel.app/#/g7` |
| Ab7 | "A flat seven" | `https://uke-chord-finder.vercel.app/#/aflat7` |
| A7 | "A seven" | `https://uke-chord-finder.vercel.app/#/a7` |
| Bb7 | "B flat seven" | `https://uke-chord-finder.vercel.app/#/bflat7` |
| B7 | "B seven" | `https://uke-chord-finder.vercel.app/#/b7` |
| Cmaj7 | "C major seven" | `https://uke-chord-finder.vercel.app/#/cmaj7` |
| C#maj7 | "C sharp major seven" | `https://uke-chord-finder.vercel.app/#/csharpmaj7` |
| Dmaj7 | "D major seven" | `https://uke-chord-finder.vercel.app/#/dmaj7` |
| Ebmaj7 | "E flat major seven" | `https://uke-chord-finder.vercel.app/#/eflatmaj7` |
| Emaj7 | "E major seven" | `https://uke-chord-finder.vercel.app/#/emaj7` |
| Fmaj7 | "F major seven" | `https://uke-chord-finder.vercel.app/#/fmaj7` |
| F#maj7 | "F sharp major seven" | `https://uke-chord-finder.vercel.app/#/fsharpmaj7` |
| Gmaj7 | "G major seven" | `https://uke-chord-finder.vercel.app/#/gmaj7` |
| Abmaj7 | "A flat major seven" | `https://uke-chord-finder.vercel.app/#/aflatmaj7` |
| Amaj7 | "A major seven" | `https://uke-chord-finder.vercel.app/#/amaj7` |
| Bbmaj7 | "B flat major seven" | `https://uke-chord-finder.vercel.app/#/bflatmaj7` |
| Bmaj7 | "B major seven" | `https://uke-chord-finder.vercel.app/#/bmaj7` |
| Cm | "C minor" | `https://uke-chord-finder.vercel.app/#/cm` |
| C#m | "C sharp minor" | `https://uke-chord-finder.vercel.app/#/csharpm` |
| Dm | "D minor" | `https://uke-chord-finder.vercel.app/#/dm` |
| Ebm | "E flat minor" | `https://uke-chord-finder.vercel.app/#/eflatm` |
| Em | "E minor" | `https://uke-chord-finder.vercel.app/#/em` |
| Fm | "F minor" | `https://uke-chord-finder.vercel.app/#/fm` |
| F#m | "F sharp minor" | `https://uke-chord-finder.vercel.app/#/fsharpm` |
| Gm | "G minor" | `https://uke-chord-finder.vercel.app/#/gm` |
| Abm | "A flat minor" | `https://uke-chord-finder.vercel.app/#/aflatm` |
| Am | "A minor" | `https://uke-chord-finder.vercel.app/#/am` |
| Bbm | "B flat minor" | `https://uke-chord-finder.vercel.app/#/bflatm` |
| Bm | "B minor" | `https://uke-chord-finder.vercel.app/#/bm` |

---

## Add extra phrasings (optional, no new shortcut needed)

A Voice Control command can have alternate phrasings — or just add a second
command pointing at the **same** shortcut. Useful extras:

- For sharps, you can also use the flat name (they're the same chord): *"D flat
  major"* → C#, *"G flat minor"* → F#m. The app resolves both.
- Say *"seventh"* if Voice Control hears that better than *"seven."*
- The app's URL resolver already understands flats, sharps, spelled-out and
  enharmonic forms, so any phrase that lands on the right slug works.

---

## Lighter alternative — one Vocal Shortcut to open the app

If 48 commands is more than you want, **iOS 18+ Vocal Shortcuts** lets you set a
single spoken phrase that runs on-device with no "Hey Siri":

- Settings → Accessibility → **Vocal Shortcuts** → assign phrase **"Chord finder"**
  → run a shortcut that opens `https://uke-chord-finder.vercel.app/`
- Say *"Chord finder"* → app opens (offline) → tap the chord (your **Recent** row
  is right at the top).

One setup, hands-free launch, then a single tap. Pair it with per-chord Voice
Control commands for the chords you most want spoken directly.

---

## Why this works when nothing else did

The microphone is blocked inside installed web apps, and web speech needs a
server — so the *app* can never hear you. Voice Control flips it: the **OS**
listens (on-device, offline) and just opens the app to a pre-built link. The
finite chord list means every phrase has one fixed destination, verified above.
