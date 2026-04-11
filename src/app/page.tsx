import Link from 'next/link'
import { getAllCategories, getAllItems, getFeaturedItems, getItemsByCategory } from '@/lib/content'
import FeaturedStrip from '@/components/FeaturedStrip'
import ArtCard from '@/components/ArtCard'
import VinylCard from '@/components/VinylCard'

const MUSIC_CATS = ['vinyl', 'cd']

function formatCategory(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function SectionHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center px-12 py-[18px] border-b border-[var(--rule)] bg-[var(--bg2)]">
      <span className="label">{title}</span>
      {right}
    </div>
  )
}

export default function HomePage() {
  const featured = getFeaturedItems()
  const categories = getAllCategories()
  const allItems = getAllItems()

  const recentArt = allItems
    .filter((item) => !MUSIC_CATS.includes(item.category))
    .sort((a, b) => (b.dateAdded ?? '').localeCompare(a.dateAdded ?? ''))
    .slice(0, 4)

  const recentMusic = allItems
    .filter((item) => MUSIC_CATS.includes(item.category))
    .sort((a, b) => (b.dateAdded ?? '').localeCompare(a.dateAdded ?? ''))
    .slice(0, 4)

  const catIcons: Record<string, string> = {
    vinyl: '⬤', cd: '💿', painting: '🖼', sculpture: '◆', furniture: '◻', 'my-works': '✏',
  }

  return (
    <>
      {featured.length > 0 && (
        <>
          <SectionHead title="Featured Works" right={
            <Link href="/collection" className="label hover:text-[var(--text)] transition-colors">View All →</Link>
          } />
          <FeaturedStrip items={featured.slice(0, 3)} />
        </>
      )}

      <SectionHead title="Browse by Category" />
      <div className="grid border-b border-[var(--rule)]"
        style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
        {categories.map((cat) => (
          <Link key={cat} href={`/${cat}`}
            className="py-5 px-4 border-r border-[var(--rule)] last:border-r-0 text-center hover:bg-[var(--bg3)] transition-colors">
            <div className="text-xl mb-2">{catIcons[cat] ?? '○'}</div>
            <div className="label block">{formatCategory(cat)}</div>
            <div className="font-serif italic text-[var(--text)] text-sm mt-1">
              {getItemsByCategory(cat).length} works
            </div>
          </Link>
        ))}
      </div>

      {recentArt.length > 0 && (
        <>
          <SectionHead title="Recent Additions" right={
            <Link href="/collection" className="label hover:text-[var(--text)] transition-colors">View All →</Link>
          } />
          <div className="grid gap-px bg-[var(--rule)]" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {recentArt.map((item) => (
              <ArtCard key={`${item.category}-${item.slug}`} item={item} />
            ))}
          </div>
        </>
      )}

      {recentMusic.length > 0 && (
        <>
          <SectionHead title="Vinyl & CD · Latest" right={
            <Link href="/vinyl" className="label hover:text-[var(--text)] transition-colors">View All →</Link>
          } />
          <div className="grid gap-px bg-[var(--rule)] border-b border-[var(--rule)]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {recentMusic.map((item) => (
              <VinylCard key={`${item.category}-${item.slug}`} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
