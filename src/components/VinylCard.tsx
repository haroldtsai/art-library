import Link from 'next/link'
import Image from 'next/image'
import type { ArtworkItem } from '@/lib/types'

export default function VinylCard({ item }: { item: ArtworkItem }) {
  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className="group block bg-[var(--bg)] hover:bg-[var(--bg3)] transition-colors overflow-hidden"
    >
      <div className="overflow-hidden relative" style={{ height: 110 }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover saturate-75 group-hover:saturate-95 transition-all duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full bg-[var(--bg3)]" />
        )}
      </div>

      <div className="px-3 pt-[10px] pb-3">
        <p style={{ fontSize: '0.4375rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {item.category}
        </p>
        <div style={{ width: '0.625rem', height: 1, background: 'var(--rule)', margin: '5px 0' }} />
        <h3 className="font-serif italic text-[var(--text)] text-xs leading-tight">
          {item.title}
        </h3>
        <p style={{ fontSize: '0.4375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 5 }}>
          {[item.artist, item.year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}
