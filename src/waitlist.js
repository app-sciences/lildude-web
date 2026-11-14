// Waiting list -> Supabase table `waitlist` (insert-only for the public key; see README).
// Plain fetch to the REST API, so no client library is shipped to visitors.
const URL_ = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export async function submit(table, data) {
  if (!URL_ || !KEY) throw new Error('Sign-ups are not switched on yet. Check back soon!')
  const res = await fetch(`${URL_}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(data),
  })
  if (res.ok) return
  if (res.status === 409) return // already on the list: treat as success
  throw new Error('Something went sideways. Try again?')
}
