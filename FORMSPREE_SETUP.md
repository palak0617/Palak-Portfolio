# Setting Up the Private Feedback System

Palak's portfolio uses **Formspree** to receive private visitor feedback directly to your email inbox.
Visitors can leave notes — you receive them by email. Nothing is stored publicly.

## Steps (5 minutes)

1. **Create a free account** at https://formspree.io
   - Free tier allows 50 submissions/month

2. **Create a new form**
   - Click "New Form"
   - Name it: "Palak Portfolio Notes"
   - Enter your email address

3. **Copy your Form ID**
   - It looks like: `xpwzgkdr` (8 characters after formspree.io/f/)

4. **Add it to the portfolio** — update TWO files:

   **`components/layout/StorybookLayout.tsx`** — line with `formspreeId=`:
   ```tsx
   formspreeId="xpwzgkdr"   // ← your ID here
   ```

   **`components/chapters/ChapterContact.tsx`** — same line:
   ```tsx
   formspreeId="xpwzgkdr"   // ← your ID here
   ```

5. **Deploy** — feedback now arrives in your inbox.

## What visitors see
- A small ✉ button (top right, always visible)
- A beautiful private modal: name (optional) + message
- "Send privately" button
- A confirmation screen: "Note received"

## What you receive
An email like:
```
Subject: ✦ New note on Palak's Portfolio
From: form@formspree.io

name: Priya Sharma
message: Your Herbal Garden project is stunning!
         The design sense is incredible.
```

## Privacy
- Notes are never shown publicly
- Only you receive them via email
- Formspree stores submissions in your dashboard (deletable)
- Visitors are told: "Only Palak will see these"
