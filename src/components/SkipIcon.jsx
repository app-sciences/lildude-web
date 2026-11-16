export function SkipIcon({ flip }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="currentColor" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 5v14M20 5v14" fill="none" />
      <path d="M8.5 5.5l9 6.5-9 6.5z" />
    </svg>
  )
}
