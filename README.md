# To Miss Tania — A Teacher's Day Memory (2026)

A personal, interactive Teacher's Day experience — not a template, not a
form letter. Built for one person: Miss Tania, from her student Kamran.

## What this is

A single-page, chapter-based memory: an envelope opens, a story unfolds
across eight cinematic chapters, and it ends with a quiet, specific thank
you. No stock photography, no generated photo of anyone — the story is told
through typography, motion, and a handful of procedural 3D scenes.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for the pinned, scrubbed cinematic sequences
  (the CONFIDENCE kinetic-type moment, the guidance path, the Aladdin
  curtain reveal)
- **Motion for React** (`motion` package) for lighter component-level
  animation (entrances, hovers, taps)
- **Three.js** via `@react-three/fiber`, used selectively in four moments
  (intro envelope, Aladdin stage dust, the tea cup + steam, the closing
  particles) — everything is procedural geometry, so there are no external
  `.glb` model files to manage
- **lucide-react** for the handful of icons actually used

### Deliberate choices worth knowing about

- **No smooth-scroll library (no Lenis).** Scroll is native. This avoids
  scroll-jacking, keeps things accessible and predictable, and plays nicely
  with GSAP ScrollTrigger's own scrubbing — adding a second scroll layer on
  top tends to fight it rather than help.
- **`prefers-reduced-motion` is respected everywhere**, not just switched
  off wholesale. Each GSAP-driven chapter has a real static fallback (the
  words/lines are simply shown, not animated); the 3D scenes fall back to a
  plain CSS/gradient stand-in.
- **No autoplay audio, anywhere.** Sound starts OFF. The bottom-right toggle
  turns it on; even then, individual sounds only fire on a real user action
  (a click, opening the memory, pressing "Hear the voice").

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run lint   # ESLint
npm run build  # production build — also the best way to catch type errors
npm run start  # serve the production build locally
```

> **Note on this build:** this project was authored in an environment
> without npm registry access, so `npm install` / `lint` / `build` could
> not be run here to auto-validate it. The code was written and manually
> reviewed carefully with that in mind, but please run `npm run build`
> yourself after installing — if anything surfaces, it'll almost certainly
> be a small, obvious fix (a typo, a missing prop), not a structural issue.

## Adding the scary-voice recording

Drop your recording at:

```
public/audio/scary-voice.mp3
```

The "Hear the voice" button in the Aladdin chapter picks it up automatically.
Until the file exists, the button shows "Recording coming soon" instead of
breaking — see `public/audio/README.md` for the full list of optional sound
files.

## Project structure

```
app/
  layout.tsx          Fonts, metadata, skip link, grain overlay
  page.tsx             Renders <Experience />
  icon.tsx              Generated favicon (no image asset needed)
  opengraph-image.tsx  Generated OG card (typographic, no photo)
  globals.css          Design tokens, grain/paper textures, focus states

  components/
    Experience.tsx      Orchestrator: chapter tracking, sound, cursor
    IntroScene.tsx       Chapter 0 — the envelope
    StoryScene.tsx        Chapter 1 — "Some teachers teach lessons."
    ConfidenceScene.tsx    Chapter 2 — kinetic typography (GSAP pinned)
    GuidanceScene.tsx       Chapter 3 — the glowing path (GSAP pinned)
    AladdinScene.tsx          Chapter 4 — the stage + scary voice
    SongScene.tsx               Chapter 5 — the Sports Day encouragement
    TeaScene.tsx                  Chapter 6 — the tea / magic mug
    FinalScene.tsx                 Chapter 7 — thank you
    RevealText.tsx        Lightweight scroll-reveal for simple text
    MagneticButton.tsx     Pointer-following CTA button
    CursorLabel.tsx          Custom cursor label (desktop only)
    SoundToggle.tsx            Sound on/off control
    ChapterIndicator.tsx         01/08-style side nav + progress
    AudioPlayer.tsx                The "Hear the voice" feature
    three/                Procedural Three.js scenes (envelope, stage
                           dust, tea cup, floating particles) + the shared
                           SceneCanvas wrapper (handles WebGL/reduced-
                           motion fallbacks and mobile DPR capping)

  hooks/
    useReducedMotion.ts   Live prefers-reduced-motion
    useIsMobile.ts          Coarse-pointer / narrow-viewport detection
    useWebglSupport.ts        WebGL capability probe
    useSound.tsx                 Site-wide sound on/off (React Context)

  utils/
    motion.ts             Chapter list + shared easing constants
    sound.ts                One-shot sound effect manager

public/
  audio/    Optional sound files (see its README.md)
  models/   Reserved for future .glb assets (unused by the current build)
  images/   Reserved for future assets
  textures/ Reserved for future assets
```

## Responsive testing

Designed and laid out for 360, 390, 430, 768, 1024, 1280, 1440, and 1920px.
Mobile gets its own composition, not a shrunk desktop layout: the custom
cursor disables itself, magnetic buttons stop pulling, 3D particle counts
drop, and the chapter indicator collapses to a thin top progress bar.

## Deploying to Vercel

1. Push this project to a new GitHub repository (this zip is ready to
   extract straight into one — `node_modules` and `.next` are already
   excluded).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository,
   and accept the default Next.js build settings.
3. Deploy. No environment variables are required for the current build.
