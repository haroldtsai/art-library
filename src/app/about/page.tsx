import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — ARTLIFE Collection',
}

export default function AboutPage() {
  return (
    <div className="grid md:grid-cols-[1fr_2fr]" style={{ minHeight: '80vh' }}>

      {/* Left column */}
      <div className="md:border-r border-b md:border-b-0 border-[var(--rule)] px-12 py-16 bg-[var(--bg2)] flex flex-col justify-between">
        <div>
          <p className="label mb-8">About</p>
          <p className="font-serif italic leading-relaxed" style={{ fontSize: '1.125rem', color: 'var(--accent)' }}>
            Life is a form of art.<br />
            Art must be grounded in life.
          </p>
        </div>
        <div className="mt-16">
          <p className="label mb-1">Contact</p>
          <a
            href="mailto:haroldtsai@hotmail.com"
            className="font-serif text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm"
          >
            haroldtsai@hotmail.com
          </a>
        </div>
      </div>

      {/* Right column */}
      <div className="px-14 py-16">
        <div
          className="font-serif"
          style={{ fontSize: '0.9375rem', lineHeight: '2.1', color: '#6b6358' }}
        >
          <p className="mb-7 text-[var(--text)]" style={{ fontSize: '1rem', lineHeight: '1.9' }}>
            I am an IC design engineer based in Taiwan, and this site is my private archive of the things I choose to live with and keep close.
          </p>
          <p className="mb-7">
            The collection moves across paintings, sculpture, furniture, records, CDs, and my own works. These categories may seem different at first, but to me they belong to the same world. I see them all as part of a continuous way of looking—how form, mood, memory, sound, and daily life come together over time.
          </p>
          <p className="mb-7">
            I am not building this archive as a commercial gallery, nor as an investment catalogue. It is a personal record of attention: works and objects that stay with me, that continue to reveal something after repeated viewing, listening, or living alongside them.
          </p>
          <p className="mb-7">
            Some pieces matter for their formal language. Some for their atmosphere. Some because they quietly shape the rhythm of a room or a day. What connects them is not category, but resonance.
          </p>
          <p>
            This site is a way to preserve that relationship—to document not only the works themselves, but also a way of seeing, collecting, and living.
          </p>
        </div>
      </div>

    </div>
  )
}
