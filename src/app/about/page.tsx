import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — ARTLIFE Collection',
}

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="text-center" style={{ maxWidth: 480 }}>
        <p className="label mb-6">About</p>
        <h1 className="font-serif italic leading-relaxed text-[var(--text)]"
          style={{ fontSize: '1.5rem' }}>
          IC Design Engineer.<br />
          Life is a form of art.<br />
          Art must be grounded in life.
        </h1>
        <div className="rule-sm mx-auto my-8" />
        <a
          href="mailto:haroldtsai@hotmail.com"
          className="label hover:text-[var(--text)] transition-colors"
        >
          haroldtsai@hotmail.com
        </a>
      </div>
    </div>
  )
}
