import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — ARTLIFE Collection',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20" style={{ minHeight: '80vh' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>

        <p className="label mb-10 text-center">About</p>

        <div className="font-serif text-center" style={{ fontSize: '0.9375rem', lineHeight: '2', color: '#6b6358' }}>
          <p className="mb-6">
            I am an IC design engineer based in Taiwan, and this site is my private archive of the things I choose to live with and keep close.
          </p>
          <p className="mb-6">
            The collection moves across paintings, sculpture, furniture, records, CDs, and my own works. These categories may seem different at first, but to me they belong to the same world — how form, mood, memory, sound, and daily life come together over time.
          </p>
          <p className="mb-6">
            It is a personal record of attention: works and objects that stay with me, that continue to reveal something after repeated viewing, listening, or living alongside them.
          </p>
          <p className="mb-6">
            What connects them is not category, but resonance.
          </p>
        </div>

        <div className="rule-sm mx-auto my-8" />

        <p className="font-serif italic text-center text-[var(--text)] mb-1" style={{ fontSize: '1rem' }}>
          Life is a form of art.
        </p>
        <p className="font-serif italic text-center text-[var(--text)] mb-10" style={{ fontSize: '1rem' }}>
          Art must be grounded in life.
        </p>

        <div className="rule-sm mx-auto mb-8" />

        <p className="label text-center">
          <a href="mailto:haroldtsai@hotmail.com" className="hover:text-[var(--text)] transition-colors">
            haroldtsai@hotmail.com
          </a>
        </p>

      </div>
    </div>
  )
}
