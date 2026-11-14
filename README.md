# Lil Dude — portable cajon drumset site

Static React (Vite) site hosted on Vercel. Waiting-list sign-ups go to Supabase.

## Run
```bash
npm install
cp .env.example .env   # fill in Supabase + PayPal values
npm run dev
```

## Media
Files live in `public/media/` and are served from Vercel's CDN: `hero.mp4`, `hero-poster.jpg`, `setup.mp4`,
`setup-poster.jpg`, `gallery-1.jpg` … `gallery-6.jpg`. 
Missing media falls back to animated psychedelic art. Keep the hero video short (≤15 s loop, ≤4 MB, 720p).

## Deploy (Vercel)
Import the repo in Vercel (Framework: Vite). `main` deploys to production, every PR gets a preview URL.
Set the `VITE_*` variables from `.env.example` under Project Settings > Environment Variables, then redeploy
(Vite bakes them in at build time).

## Forms & payments
- Waiting list sign-ups are inserted into the Supabase `waitlist` table. Row-level security lets the public key insert only; read the list in the Supabase dashboard (Table Editor, export CSV). Free Supabase projects pause after a week of inactivity, so keep it warm or upgrade.
- Pre-orders use a PayPal checkout button (`VITE_PAYPAL_CHECKOUT_URL`); PayPal records the orders.
- Donations use `VITE_PAYPAL_ME` for preset amounts and optional `VITE_PAYPAL_DONATE_URL` for any amount.
