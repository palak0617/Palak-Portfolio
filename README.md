# Palak's Portfolio — Magical Vintage Storybook

A cinematic, immersive portfolio experience built with Next.js 14, Framer Motion, and Tailwind CSS.
The portfolio presents itself as an interactive vintage storybook where each section is a "chapter"
you navigate by turning pages.

---

## ✨ Features

- **Cinematic landing scene** — candlelit room, floating dust particles, leather-bound book
- **Book opening animation** — levitation, magical burst, page turn transition
- **Page-by-page navigation** — each chapter appears as a separate book page with animated transitions
- **Interactive bookmarks** — fabric ribbon tabs for instant chapter navigation
- **Diary writing animation** — handwriting typewriter effect for intro text
- **Firefly system** — ambient fireflies floating across the page
- **Dual vintage themes** — light parchment & dark candlelit library
- **Ambient sound** — Howler.js powered page-turn SFX and background music (opt-in)
- **Keyboard navigation** — ←→ arrow keys to turn pages
- **Fully responsive** — works on mobile, tablet, and desktop

---

## 📁 Project Structure

```
palak-portfolio/
├── app/
│   ├── layout.tsx          # Root layout, font setup, metadata
│   └── page.tsx            # Entry point — landing → opening → storybook
│
├── components/
│   ├── book/
│   │   ├── VintageBook.tsx         # 3D leather-bound book with hover parallax
│   │   ├── LandingScene.tsx        # Full candlelit landing environment
│   │   ├── OpeningAnimation.tsx    # Cinematic opening transition
│   │   ├── PageTurn.tsx            # Page flip animation overlay
│   │   └── InteractiveBookmarks.tsx # Right-edge bookmark navigation
│   │
│   ├── chapters/
│   │   ├── ChapterIntro.tsx        # Typewriter intro + profile
│   │   ├── ChapterAbout.tsx        # Diary entries + scrapbook
│   │   ├── ChapterSkills.tsx       # Ink stamp skill tags
│   │   ├── ChapterProjects.tsx     # Journal card projects
│   │   ├── ChapterJourney.tsx      # Animated vertical timeline
│   │   └── ChapterContact.tsx      # Handwritten letter + wax seal
│   │
│   ├── effects/
│   │   ├── Candle.tsx              # Animated wax candle with flame
│   │   ├── AmbientParticles.tsx    # Canvas floating dust system
│   │   ├── FireflySystem.tsx       # Spawning firefly dots
│   │   ├── DiaryWritingAnimation.tsx # Typewriter ink effect
│   │   └── MagicalOverlay.tsx      # Burst particles on book open
│   │
│   ├── layout/
│   │   ├── ChapterLayout.tsx       # Book page shell (spine, header, footer, rules)
│   │   └── StorybookLayout.tsx     # Main controller — chapters, navigation, controls
│   │
│   └── ui/
│       ├── ThemeProvider.tsx       # Light/dark vintage theme context
│       ├── SoundProvider.tsx       # Howler.js sound context
│       ├── ThemeToggle.tsx         # Theme toggle button
│       ├── MusicToggle.tsx         # Music toggle button
│       ├── VintageCard.tsx         # Project card with tape effect
│       ├── AnimatedTimeline.tsx    # Scroll-reveal timeline
│       └── ContactLetter.tsx       # Handwritten letter UI
│
├── hooks/
│   ├── useScrollReveal.ts          # IntersectionObserver reveal hook
│   ├── useParticles.ts             # Canvas particle system hook
│   └── useKeyboardNav.ts           # Arrow key navigation hook
│
├── lib/
│   └── data.ts                     # All portfolio content (edit this!)
│
├── config/
│   └── animations.ts               # Shared Framer Motion variants
│
├── utils/
│   └── helpers.ts                  # cn(), rand(), mapRange(), EASING
│
├── types/
│   └── index.ts                    # TypeScript interfaces
│
├── styles/
│   └── globals.css                 # Tailwind base, CSS vars, textures, keyframes
│
├── public/
│   └── sounds/
│       ├── README.md               # Where to place audio files
│       ├── ambient.mp3             # (you add this)
│       ├── page-turn.mp3           # (you add this)
│       └── magic.mp3               # (you add this)
│
├── tailwind.config.ts              # Full vintage palette, custom animations
├── next.config.js                  # Next.js config
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18.17+ (required for Next.js 14)
- npm or yarn

### Steps

```bash
# 1. Create the project folder and enter it
mkdir palak-portfolio && cd palak-portfolio

# 2. Copy all generated files into this directory (maintaining structure above)

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

---

## 🎵 Adding Sound Effects

1. Download free sounds from:
   - https://freesound.org — search "page turn", "magic sparkle", "ambient piano"
   - https://pixabay.com/music/

2. Place files in `/public/sounds/`:
   - `ambient.mp3` — looping soft piano (1–3 min)
   - `page-turn.mp3` — paper flip sound (~0.5s)
   - `magic.mp3` — magical shimmer (~1s)

3. Sound only plays when the user clicks the 🎵 button — no autoplay.

---

## ✏️ Customising Content

All content lives in one file: **`lib/data.ts`**

Edit these fields:
- `name`, `initials`, `tagline`, `email`, `github`, `linkedin`
- `intro` — hero paragraph
- `about[]` — diary entries (date + text)
- `skills[]` — skill tags with colors
- `projects[]` — project cards
- `timeline[]` — journey milestones

---

## 🎨 Theming

Two themes are available via the ☀/☽ toggle:

**Light Vintage** — warm parchment, soft sunlight, beige pages
**Dark Vintage** — dark library, candlelit ambience, golden glows

To add custom colors, extend `tailwind.config.ts` → `colors`.
To change CSS variable defaults, edit `styles/globals.css` → `:root`.

---

## 🌍 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```
Or connect GitHub repo at vercel.com → auto-deploys on push.

### Netlify
```bash
npm run build
# Upload the `.next` folder, or connect via netlify.toml
```

### Self-hosted
```bash
npm run build
npm start
# Runs on port 3000
```

---

## ⚡ Performance Notes

- All animations use `framer-motion` with GPU-composited properties (`opacity`, `transform`)
- Particles run on canvas — no DOM manipulation
- Fireflies use CSS animations (not JS per-frame)
- Fonts are loaded via `next/font/google` — zero layout shift, self-hosted
- Images use `next/image` with lazy loading
- `AnimatePresence` + `mode="wait"` ensures clean chapter transitions

---

## ♿ Accessibility

- All interactive elements have `aria-label`
- `role="button"` + `tabIndex` on the book for keyboard open
- Keyboard navigation: ← → arrows between chapters
- Screen-reader-friendly chapter headings
- Focus-visible ring styled in gold
- Reduced motion: Framer Motion respects `prefers-reduced-motion`

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` 14 | App Router, SSR, image optimisation |
| `framer-motion` | All animations and transitions |
| `howler` | Sound effects and ambient music |
| `lenis` | Smooth scroll (optional, within chapters) |
| `clsx` + `tailwind-merge` | Class merging utility |
| `tailwindcss` | Utility CSS with vintage config |

---

*Made with love & ink · Palak · 2024*
