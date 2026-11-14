# Lil Dude — portable cajon drumset site

Static React (Vite) site hosted on Vercel. Firebase project `backup-2b746` is used only for Firestore (waiting list).

## Run
```bash
npm install
cp .env.example .env   # fill in Firebase web config + PayPal link
npm run dev
```

## Media
Files live in `public/media/` and are served from Vercel's CDN: `hero.mp4`, `hero-poster.jpg`, `setup.mp4`,
`setup-poster.jpg`, `gallery-1.jpg` … `gallery-6.jpg`. Set `VITE_MEDIA_BASE` if serving from Storage.
Missing media falls back to animated psychedelic art. Keep the hero video short (≤15 s loop, ≤4 MB, 720p).

## Deploy (Vercel)
Import the repo in Vercel (Framework: Vite). `main` deploys to production, every PR gets a preview URL.
Set the `VITE_*` variables from `.env.example` under Project Settings > Environment Variables, then redeploy
(Vite bakes them in at build time). Firestore rules live in `firestore.rules`; publish them once in the Firebase console.

## Forms & payments
- Waiting list sign-ups are written to Firestore (`waitlist`); rules allow create-only.
- Pre-orders use a PayPal checkout button (`VITE_PAYPAL_CHECKOUT_URL`); PayPal records the orders.
- Donations use `VITE_PAYPAL_ME` for preset amounts and optional `VITE_PAYPAL_DONATE_URL` for any amount.
