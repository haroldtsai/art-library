import Link from 'next/link'
import Image from 'next/image'
import type { ArtworkItem } from '@/lib/types'

export default function ArtCard({ item }: { item: ArtworkItem }) {
  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className="group block bg-[var(--bg)] hover:bg-[var(--bg3)] transition-colors overflow-hidden"
    >
      <div className="overflow-hidden relative" style={{ height: 240 }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover saturate-[0.78] contrast-[1.02] group-hover:saturate-95 transition-all duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-[var(--bg3)] flex items-center justify-center">
            <span className="label opacity-40">No image</span>
          </div>
        )}
      </div>

      <div className="px-5 pt-4 pb-5">
        <p className="label">{item.category}</p>
        <div className="rule-sm" />
        <h2 className="font-serif italic text-[var(--text)] text-[1.0625rem] leading-snug">
          {item.title}
        </h2>
        <p className="label mt-[7px]">
          {[item.artist, item.year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}
