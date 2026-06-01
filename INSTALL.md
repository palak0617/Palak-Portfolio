# Installation Guide — Palak's Portfolio

Complete step-by-step setup from zero to deployed.

---

## Step 1 — Prerequisites

Check you have Node.js 18.17 or later:

```bash
node --version   # Should print v18.x.x or higher
npm --version    # Should print 9.x or higher
```

If not, download from https://nodejs.org (choose LTS version).

---

## Step 2 — Extract the project

```bash
# If you downloaded the .tar.gz:
tar -xzf palak-portfolio.tar.gz
cd palak-portfolio

# Or if you received a .zip:
unzip palak-portfolio.zip
cd palak-portfolio
```

---

## Step 3 — Install dependencies

```bash
npm install
```

This installs:
- Next.js 14 (framework)
- Framer Motion (animations)
- Howler.js (sounds)
- Lenis (smooth scrolling)
- Tailwind CSS (styling)

Installation takes ~1–2 minutes.

---

## Step 4 — Add sound files (optional but recommended)

Place these files in the `/public/sounds/` folder:

| Filename | What it is | Where to get it |
|----------|-----------|-----------------|
| `ambient.mp3` | Looping soft piano music | freesound.org → search "ambient piano loop" |
| `page-turn.mp3` | Paper flip sound | freesound.org → search "page turn" |
| `magic.mp3` | Magical shimmer SFX | freesound.org → search "magic sparkle" |

The portfolio works perfectly without sounds — they are opt-in only.

---

## Step 5 — Customise your content

Open `lib/data.ts` and update:

```typescript
export const PORTFOLIO_DATA = {
  name: 'Palak',           // ← Your name
  initials: 'P',           // ← Your initials (shown in avatar)
  tagline: '...',          // ← Your tagline
  email: 'you@email.com',  // ← Your email
  github: 'https://...',   // ← Your GitHub URL
  linkedin: 'https://...', // ← Your LinkedIn URL
  // ... projects, skills, timeline — all editable here
};
```

---

## Step 6 — Run locally

```bash
npm run dev
```

Open your browser at http://localhost:3000

You should see the candlelit landing scene with the book.

---

## Step 7 — Build for production

```bash
npm run build
npm start
```

---

## Deploy to Vercel (easiest — recommended)

### Option A: CLI
```bash
npm install -g vercel
vercel
# Follow prompts — done in ~2 minutes
```

### Option B: GitHub
1. Push your code to a GitHub repository
2. Go to https://vercel.com → New Project
3. Import your repository
4. Click Deploy — Vercel auto-detects Next.js

Your site will be live at `https://your-project.vercel.app`

---

## Deploy to Netlify

1. Push to GitHub
2. Go to https://netlify.com → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the Next.js plugin: `@netlify/plugin-nextjs`

---

## Deploy to a custom server (VPS/Linux)

```bash
# On your server
git clone your-repo
cd palak-portfolio
npm install
npm run build

# Run with PM2 (process manager)
npm install -g pm2
pm2 start "npm start" --name palak-portfolio
pm2 save
pm2 startup
```

---

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Fonts not loading
- Make sure you have internet access (fonts load from Google Fonts on first build)
- Or run `npm run build` which will cache them

### Animations too slow / laggy
- Open `tailwind.config.ts` and reduce `animation` durations
- In `components/effects/FireflySystem.tsx`, reduce `FIREFLY_COUNT`
- In `components/effects/ButterflySystem.tsx`, reduce `BUTTERFLY_COUNT`

### Sounds not playing
- Place mp3 files in `/public/sounds/`
- Click the 🎵 button in the top-right corner to enable audio
- Note: browsers block autoplay — sounds only work after user interaction

### Page looks white / no styling
- Make sure `styles/globals.css` is imported in `app/layout.tsx`
- Run `npm run build` to check for CSS errors

---

## Project structure (quick reference)

```
lib/data.ts          ← YOUR CONTENT — edit this first
styles/globals.css   ← CSS variables, fonts, dark mode
tailwind.config.ts   ← Color palette, animations
components/
  book/              ← Landing scene, book, page turn
  chapters/          ← Each portfolio section
  effects/           ← Fireflies, butterflies, particles, candles
  layout/            ← Book page shell, main layout
  ui/                ← Buttons, cards, timeline, letter
hooks/               ← Navigation, particles, scroll reveal
public/sounds/       ← Drop your .mp3 files here
```
