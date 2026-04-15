import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — ARTLIFE Collection',
}

export default function AboutPage() {
  return (
    <div className="px-12 py-16 border-b border-[var(--rule)]" style={{ maxWidth: '48rem' }}>
      <p className="label mb-8">About</p>

      <div className="font-serif text-[var(--text)]" style={{ fontSize: '0.9375rem', lineHeight: '2' }}>
        <p className="mb-6">
          I am an IC design engineer based in Taiwan, and this site is my private archive of the things I choose to live with and keep close.
        </p>
        <p className="mb-6">
          The collection moves across paintings, sculpture, furniture, records, CDs, and my own works. These categories may seem different at first, but to me they belong to the same world. I see them all as part of a continuous way of looking—how form, mood, memory, sound, and daily life come together over time.
        </p>
        <p className="mb-6">
          I am not building this archive as a commercial gallery, nor as an investment catalogue. It is a personal record of attention: works and objects that stay with me, that continue to reveal something after repeated viewing, listening, or living alongside them.
        </p>
        <p className="mb-6">
          Some pieces matter for their formal language. Some for their atmosphere. Some because they quietly shape the rhythm of a room or a day. What connects them is not category, but resonance.
        </p>
        <p className="mb-10">
          This site is a way to preserve that relationship—to document not only the works themselves, but also a way of seeing, collecting, and living.
        </p>
      </div>

      <div className="rule-sm mb-8" />

      <p className="font-serif italic text-[var(--text)] mb-1" style={{ fontSize: '1.0625rem' }}>
        Life is a form of art.
      </p>
      <p className="font-serif italic text-[var(--text)] mb-10" style={{ fontSize: '1.0625rem' }}>
        Art must be grounded in life.
      </p>

      <a
        href="mailto:haroldtsai@hotmail.com"
        className="label hover:text-[var(--text)] transition-colors"
      >
        haroldtsai@hotmail.com
      </a>
    </div>
  )
}
