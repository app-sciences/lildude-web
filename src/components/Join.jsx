import { useEffect, useState } from 'react'
import { submit } from '../waitlist.js'
import { links, paypalAmountUrl, PRICE, CAMPAIGN_URL } from '../config.js'
import { track, PREORDER_ITEM } from '../analytics.js'

function useForm(collectionName, source) {
  const [state, setState] = useState({ status: 'idle', error: '' })
  const send = async (data) => {
    setState({ status: 'loading', error: '' })
    try {
      await submit(collectionName, source ? { ...data, source } : data)
      setState({ status: 'done', error: '' })
      return true
    } catch (e) {
      setState({ status: 'error', error: e.message || 'Something went sideways. Try again?' })
      return false
    }
  }
  return [state, send]
}

function Status({ state, thanks }) {
  if (state.status === 'done') return <p className="ok">{thanks}</p>
  if (state.status === 'error') return <p className="err">{state.error}</p>
  return null
}

function Waitlist() {
  const [state, send] = useForm('waitlist', 'site')
  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    track('waitlist_submit')
    send({ name: f.get('name').trim(), email: f.get('email').trim() }).then((ok) => ok && track('generate_lead', { source: 'waitlist' }))
  }
  return (
    <form onSubmit={onSubmit} className="form">
      <p>be first in line when the next batch of lildudes is born.</p>
      <input name="name" placeholder="Your name" required maxLength={80} />
      <input name="email" type="email" placeholder="Email" required maxLength={200} />
      <button className="btn btn-primary" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Sending good vibes…' : 'Put me on the list'}
      </button>
      <Status state={state} thanks="you're on the list! we'll be in touch." />
    </form>
  )
}

function Preorder() {
  const url = links.checkout
  return (
    <div className="form">
      <p>reserve yours from the first batch -- coming soon</p>
      <a className={`btn btn-primary ${url ? '' : 'disabled'}`} href={url || undefined}
        onClick={() => track('begin_checkout', { currency: 'USD', value: PRICE, items: [PREORDER_ITEM(PRICE)] })}
        target="_blank" rel="noopener noreferrer">
        {url ? 'Pre-order with PayPal' : 'Pre-orders opening soon'}
      </a>
      <p className="hint">
        not ready yet?{' '}
        <button type="button" className="link-btn" onClick={() => {
          track('preorder_to_waitlist')
          window.dispatchEvent(new CustomEvent('ld-join-tab', { detail: 'waitlist' }))
        }}>hop on the waiting list</button>{' '}instead.
      </p>
    </div>
  )
}

function Donate() {
  const amounts = [10, 25, 50, 100]
  return (
    <div className="form">
      <p>chip in so a kid or a school can have a lildude of their own. every drum counts.</p>
      {/* preset amounts only work with a PayPal.me link; a hosted Donate button asks for the amount itself */}
      {links.paypalMe && (
        <div className="amounts">
          {amounts.map((a) => (
            <a key={a} className="btn btn-ghost"
              href={paypalAmountUrl(a)}
              onClick={() => track('begin_donation', { currency: 'USD', value: a })}
              target="_blank" rel="noopener noreferrer">${a}</a>
          ))}
        </div>
      )}
      <a className={`btn btn-primary ${links.donate ? '' : 'disabled'}`}
        href={links.donate || undefined}
        onClick={() => track('begin_donation', { currency: 'USD', value: 'any' })} target="_blank" rel="noopener noreferrer">
        {links.donate ? (links.paypalMe ? 'Donate any amount' : 'Donate with PayPal') : 'Donations opening soon'}
      </a>
    </div>
  )
}

const tabs = [
  { id: 'waitlist', label: 'waiting list', Comp: Waitlist },
  { id: 'preorder', label: 'pre-order', Comp: Preorder },
  { id: 'donate', label: 'donate', Comp: Donate },
]

export default function Join() {
  const [tab, setTab] = useState('waitlist')
  useEffect(() => {
    const h = (e) => setTab(e.detail || 'waitlist')
    addEventListener('ld-join-tab', h)
    return () => removeEventListener('ld-join-tab', h)
  }, [])
  const Active = tabs.find((t) => t.id === tab).Comp
  return (
    <section className="section join" id="join">
      <h2>back the campaign, get goodies</h2>
      <p className="lead">our campaign funds the first production run. join the list and we’ll tell you the minute it opens.</p>
      {CAMPAIGN_URL && (
        <p><a className="btn btn-primary" href={CAMPAIGN_URL} target="_blank" rel="noopener noreferrer"
          onClick={() => track('campaign_click')}>back the campaign</a></p>
      )}
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id}
            className={tab === t.id ? 'tab on' : 'tab'} onClick={() => { setTab(t.id); track('join_tab', { tab: t.id }) }}>{t.label}</button>
        ))}
      </div>
      <div className="panel"><Active /></div>
    </section>
  )
}
