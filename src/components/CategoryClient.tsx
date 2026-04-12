'use client'

import { useState, useMemo } from 'react'
import ArtCard from './ArtCard'
import VinylCard from './VinylCard'
import type { ArtworkItem, SortKey, SortDir } from '@/lib/types'

const MUSIC_CATS = ['vinyl', 'cd']

function SectionHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center px-12 py-[18px] border-b border-[var(--rule)] bg-[var(--bg2)]">
      <span className="label">{title}</span>
      {right && <span className="label flex gap-4">{right}</span>}
    </div>
  )
}

function sortItems(items: ArtworkItem[], key: SortKey, dir: SortDir) {
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
  items: ArtworkItem[]
  category: string
  allTags: string[]
}

export default function CategoryClient({ items, category, allTags }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('dateAdded')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    let base = items
    if (activeTags.length > 0) {
      base = base.filter((item) => activeTags.every((t) => item.tags?.includes(t)))
    }
    return sortItems(base, sortKey, sortDir)
  }, [items, activeTags, sortKey, sortDir])

  function toggleTag(tag: string) {
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const isMusic = MUSIC_CATS.includes(category)
  const cols = isMusic ? 'repeat(4, 1fr)' : '1fr 1fr'

  return (
    <>
      {/* Sort + count */}
      <SectionHead title={`${filtered.length} works`} right={
        <>
          {(['dateAdded', 'year', 'title'] as SortKey[]).map((k) => (
            <button key={k} onClick={() => toggleSort(k)}
              className={`transition-colors ${sortKey === k ? 'text-[var(--text)]' : 'hover:text-[var(--text)]'}`}>
              {k === 'dateAdded' ? 'Recent' : k === 'year' ? 'Year' : 'Name'}
              {sortKey === k ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
            </button>
          ))}
        </>
      } />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-px bg-[var(--rule)] border-b border-[var(--rule)]"
          style={{ gridTemplateColumns: cols }}>
          {filtered.map((item) =>
            isMusic
              ? <VinylCard key={item.slug} item={item} />
              : <ArtCard key={item.slug} item={item} />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center py-24">
          <p className="label">No items match the selected filters</p>
        </div>
      )}
    </>
  )
}
