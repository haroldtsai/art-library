'use client'

import { useState, useMemo } from 'react'
import ArtCard from './ArtCard'
import VinylCard from './VinylCard'
import FeaturedStrip from './FeaturedStrip'
import type { ArtworkItem, SortKey, SortDir } from '@/lib/types'

const MUSIC_CATS = ['vinyl', 'cd']

function SectionHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center px-12 py-[18px] border-b border-[var(--rule)] bg-[var(--bg2)]">
      <span className="label">{title}</span>
      {right && <span className="label">{right}</span>}
    </div>
  )
}

function sortItems(items: ArtworkItem[], key: SortKey, dir: SortDir): ArtworkItem[] {
  return [...items].sort((a, b) => {
    let av: string | number = '', bv: string | number = ''
    if (key === 'year') { av = a.year ?? 0; bv = b.year ?? 0 }
    else if (key === 'title') { av = a.title.toLowerCase(); bv = b.title.toLowerCase() }
    else { av = a.dateAdded ?? ''; bv = b.dateAdded ?? '' }
    if (av < bv) return dir === 'asc' ? -1 : 1
    if (av > bv) return dir === 'asc' ? 1 : -1
    return 0
  })
}

interface Props {
  allItems: ArtworkItem[]
  featured: ArtworkItem[]
  categories: string[]
}

export default function CollectionClient({ allItems, featured, categories }: Props) {
  const [activeTab, setActiveTab] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('dateAdded')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    const base = activeTab === 'all' ? allItems : allItems.filter((i) => i.category === activeTab)
    return sortItems(base, sortKey, sortDir)
  }, [allItems, activeTab, sortKey, sortDir])

  const artItems = filtered.filter((i) => !MUSIC_CATS.includes(i.category))
  const musicItems = filtered.filter((i) => MUSIC_CATS.includes(i.category))

  const counts: Record<string, number> = { all: allItems.length }
  categories.forEach((c) => { counts[c] = allItems.filter((i) => i.category === c).length })

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  const sortLabel = (key: SortKey, label: string) => (
    <button key={key} onClick={() => toggleSort(key)}
      className={`label transition-colors ${sortKey === key ? 'text-[var(--text)]' : 'hover:text-[var(--text)]'}`}>
      {label}{sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
    </button>
  )

  return (
    <>
      {/* Featured */}
      {featured.length > 0 && (
        <>
          <SectionHead title="Featured Works" right={`${featured.length} featured`} />
          <FeaturedStrip items={featured.slice(0, 3)} />
        </>
      )}

      {/* Category tabs */}
      <div className="flex border-b border-[var(--rule)] bg-[var(--bg)] overflow-x-auto">
        {['all', ...categories].map((cat) => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            className={`px-6 py-[13px] label whitespace-nowrap border-r border-[var(--rule)] transition-all border-b-2 ${
              activeTab === cat
                ? 'text-[var(--text)] border-b-[var(--accent)] bg-[var(--bg)]'
                : 'border-b-transparent hover:text-[var(--text)] hover:bg-[var(--bg2)]'
            }`}>
            {cat === 'all' ? 'All' : cat.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')}
            {' '}· {counts[cat] ?? 0}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <SectionHead
        title={`${filtered.length} works`}
        right={
          <span className="flex gap-4">
            {sortLabel('dateAdded', 'Recent')}
            {sortLabel('year', 'Year')}
            {sortLabel('title', 'Name')}
          </span>
        }
      />

      {/* Art grid */}
      {artItems.length > 0 && (
        <div className="grid gap-px bg-[var(--rule)]" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {artItems.map((item) => (
            <ArtCard key={`${item.category}-${item.slug}`} item={item} />
          ))}
        </div>
      )}

      {/* Music grid */}
      {musicItems.length > 0 && (
        <>
          {artItems.length > 0 && (
            <SectionHead title="Vinyl & CD" right={`${musicItems.length} records`} />
          )}
          <div className="grid gap-px bg-[var(--rule)] border-b border-[var(--rule)]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {musicItems.map((item) => (
              <VinylCard key={`${item.category}-${item.slug}`} item={item} />
            ))}
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <div className="flex items-center justify-center py-24">
          <p className="label">No items found</p>
        </div>
      )}
    </>
  )
}
