import Link from 'next/link'
import Image from 'next/image'
import type { ArtworkItem } from '@/lib/types'

function formatCategory(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function HeroItem({ item }: { item: ArtworkItem }) {
  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className="group relative block overflow-hidden"
      style={{ minHeight: 400 }}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="60vw"
          priority
          className="object-cover saturate-[0.82] contrast-[1.03] group-hover:saturate-95 transition-all duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--bg3)]" />
      )}

      {/* Featured badge */}
      <span
        className="absolute top-5 left-5 label bg-[var(--accent)] text-[var(--bg)] px-[10px] py-1"
        style={{ fontSize: '0.4375rem' }}
      >
        Featured
      </span>

      {/* Caption overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-7 pb-7 pt-10"
        style={{ background: 'linear-gradient(transparent, rgba(15,12,9,0.75))' }}>
        <p style={{ fontSize: '0.4375rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,184,154,0.75)' }}>
          {formatCategory(item.category)}
        </p>
        <h2 className="font-serif italic text-white text-2xl mt-1">{item.title}</h2>
        <p style={{ fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          {[item.year, item.medium ?? item.label].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}

function SideItem({ item }: { item: ArtworkItem }) {
  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className="group flex flex-1 border-b border-[var(--rule)] last:border-b-0 hover:bg-[var(--bg3)] transition-colors overflow-hidden"
    >
      <div className="relative overflow-hidden flex-shrink-0" style={{ width: 130 }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="130px"
            className="object-cover saturate-75 group-hover:saturate-95 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--bg3)]" />
        )}
      </div>

      <div className="flex flex-col justify-center px-5 py-5">
        <span
          className="label bg-[var(--accent)] text-[var(--bg)] px-2 py-[3px] mb-[10px] w-fit"
          style={{ fontSize: '0.375rem' }}
        >
          Featured
        </span>
        <p className="label">{formatCategory(item.category)}</p>
        <h3 className="font-serif italic text-[var(--text)] text-[0.9375rem] mt-[5px] leading-tight">
          {item.title}
        </h3>
        <p className="label mt-[7px]">
          {[item.medium ?? item.label, item.year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}

export default function FeaturedStrip({ items }: { items: ArtworkItem[] }) {
  if (!items.length) return null

  const [hero, ...rest] = items
  const sideItems = rest.slice(0, 2)

  return (
    <div className="grid border-b border-[var(--rule)]" style={{ gridTemplateColumns: '3fr 2fr', minHeight: 400 }}>
      {/* Hero */}
      <div className="border-r border-[var(--rule)]">
        <HeroItem item={hero} />
      </div>

      {/* Sidebar */}
      <div className="flex flex-col">
        {sideItems.map((item) => (
          <SideItem key={item.slug} item={item} />
        ))}
        {/* Fill empty slot if only 1 side item */}
        {sideItems.length < 2 && (
          <div className="flex-1 bg-[var(--bg2)]" />
        )}
      </div>
    </div>
  )
}
