# Quick Setup Guide — Palak Portfolio v7

## 1. Install & Run
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 2. Enable Private Messaging (2 mins)

### Option A — Formspree (recommended, clean UI)
1. Sign up free at https://formspree.io
2. Create a new form, enter your email
3. Copy the Form ID (e.g. `xpwzgkdr`)
4. In the project root, copy `.env.local.example` → `.env.local`
5. Set `NEXT_PUBLIC_FORMSPREE_ID=your_actual_id`
6. Set `NEXT_PUBLIC_CONTACT_EMAIL=your@email.com`
7. Restart: `npm run dev`

### Option B — Mailto fallback (zero setup, works immediately)
- Just set `NEXT_PUBLIC_CONTACT_EMAIL=your@email.com` in `.env.local`
- When visitors click "Send privately", their email client opens pre-filled
- Works without any account

Both options are private — messages only go to you, never shown publicly.

## 3. Add Achievement Photos
Drop your photos into `/public/images/achievements/`:
- `achievement-1.jpg` through `achievement-6.jpg`

Edit captions in `components/chapters/ChapterAchievements.tsx` → `FRAMES` array.

## 4. Customise Content
All text, projects, skills, timeline → `lib/data.ts`

## 5. Deploy to Vercel
```bash
npx vercel
```
Add environment variables in the Vercel dashboard under Settings → Environment Variables.
