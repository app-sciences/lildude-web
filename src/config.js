// Media is served from /media (public/media, on Vercel's CDN). Set VITE_MEDIA_BASE to use another CDN or bucket.
const base = (import.meta.env.VITE_MEDIA_BASE || '/media').replace(/\/$/, '')

export const media = {
  heroVideo: `${base}/hero.mp4`,
  heroPoster: `${base}/hero-poster.jpg`,
  tuningVideo: `${base}/tuning.mp4`,
  tuningPoster: `${base}/tuning-poster.jpg`,
  prototypeVideo: `${base}/prototype.mp4`,
  prototypePoster: `${base}/prototype-poster.jpg`,
  hihatVideo: `${base}/hihat.mp4`,
  hihatPoster: `${base}/hihat-poster.jpg`,
  setupStart: `${base}/setup-start.jpg`,
  setupVideo: `${base}/setup.mp4`,
  setupPoster: `${base}/setup-poster.jpg`,
  // Add real photos as /media/gallery-1.jpg ... ; art fallbacks show until they exist
  images: [1, 2, 3, 4, 5, 6].map((n) => `${base}/gallery-${n}.jpg`),
}

// PayPal: PAYPAL_ME is your PayPal.me link (e.g. https://paypal.me/yourname), used for
// preset amounts and pre-order totals. DONATE_URL (optional) is a hosted PayPal Donate
// button link, used for "any amount"; falls back to PAYPAL_ME.
const trim = (u) => (u || '').replace(/\/$/, '')
export const links = {
  checkout: import.meta.env.VITE_PAYPAL_CHECKOUT_URL || '', // PayPal checkout button link for pre-orders
  paypalMe: trim(import.meta.env.VITE_PAYPAL_ME),
  donate: import.meta.env.VITE_PAYPAL_DONATE_URL || trim(import.meta.env.VITE_PAYPAL_ME),
}
export const paypalAmountUrl = (amount) => (links.paypalMe ? `${links.paypalMe}/${amount}USD` : '')

export const PRICE = 149 // placeholder pre-order price (USD)

// Flip to true ONLY after a patent application (e.g. a provisional) has actually been filed.
// Marking a product "patent pending" without a filed application is false marking.
export const PATENT_PENDING = false

// Crowdfunding campaign page (Kickstarter / Indiegogo / ...). Blank until the campaign is live.
export const CAMPAIGN_URL = import.meta.env.VITE_CAMPAIGN_URL || ''
