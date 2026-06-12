# Getting to a Chord Fast — Access Guide

**The honest finding from research:** true "say the chord, see the diagram" voice
is *not reliable* on iPhone for this kind of app, for two hard reasons:

1. **In-app voice is impossible here.** The browser's speech recognition (Web
   Speech API) **does not work in installed home-screen web apps on iOS**, and it
   **requires an internet connection** — which would break the offline guarantee
   that's the whole point of this app.
2. **Dictated-input Siri shortcuts are genuinely flaky.** Chaining Siri →
   dictation → text-replace → URL is fragile and breaks between iOS versions
   (documented widely on Apple's own developer forums). That's why the earlier
   "Ukulele Chord [name]" shortcut kept failing.

So instead of fighting speech parsing, the winning approach is:
**make launching the app instant, and make the open app one tap.**
The app now helps the second half: your **Recent** chords sit as one-tap buttons
at the top (a song reuses the same few chords), and the **screen stays awake**
while it's open.

Below are the reliable launch methods, best first. Set up one or two per phone.

---

## Method 1 — Back Tap (recommended, works on both phones)

Double-tap the **back of the phone** → the app opens. No talking, no hunting for
an icon. Then tap the chord (your recents are right at the top).

**First, make a simple "open" shortcut:**
1. Shortcuts app → **+**
2. Add Action → search **"Open URLs"**
3. URL: `https://uke-chord-finder.vercel.app/`  *(no chord on the end — just opens the app)*
4. Name it **Ukulele Chords** → Done

**Then assign it to Back Tap:**
5. Settings → **Accessibility** → **Touch** → **Back Tap**
6. **Double Tap** → scroll to the **Shortcuts** section → choose **Ukulele Chords**

Now double-tapping the back of the phone opens the app from anywhere.
*(Requires iPhone 8 or newer — both phones qualify.)*

---

## Method 2 — "Hey Siri, Ukulele Chords" (reliable, voice-launch only)

This uses the **same simple "open" shortcut** from Method 1. Because it only
*opens the app* (no chord name to mis-hear, no URL to mangle), Siri handles it
reliably.

- Say: **"Hey Siri, Ukulele Chords"** → the app opens → tap the chord.

This is the reliable version of the voice dream: Siri gets you in, the Recent
row + grid get you to the chord in one tap.

---

## Method 3 — Action Button (iPhone 15 Pro / 16 / 17 only)

If either phone has the physical **Action Button**:
1. Settings → **Action Button**
2. Swipe to **Shortcut** → choose **Ukulele Chords**

One press of the side button opens the app. Fastest option if you have it.

---

## Method 4 — Lock Screen / Home Screen icon

- **Home Screen:** the installed icon is already one tap (Safari → Share → Add to
  Home Screen, if not done yet).
- **Lock Screen:** add a Shortcuts widget to the Lock Screen pointing at the
  **Ukulele Chords** shortcut for one-tap access without unlocking fully.

---

## Why this is actually fine

The charter always accepted that Siri would *open the app to a chord* rather than
read it inline (Locked Decision LDD-2). What changed after testing is that even
passing the chord name by voice is unreliable — so we drop it. With Back Tap +
Recents, the real-world flow mid-song is:

> double-tap back of phone → tap the chord (usually already in Recent) → done.

Two taps, no typing, no talking, fully offline. That beats a clever voice flow
that doesn't fire.

---

## Still want to try true voice-to-chord?

It can be *attempted* (the deep-link `…/#/<chord>` works and the resolver is now
very forgiving), but expect it to be inconsistent. If you want to try it, use the
**"Ask for Input" + "Replace Text (# → sharp)"** shortcut from before and treat
any success as a bonus, not the primary path. The reliable everyday method is
Back Tap above.
