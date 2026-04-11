import Link from 'next/link'
import { getAllCategories, getAllItems } from '@/lib/content'

function formatCategory(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function Nav() {
  const categories = getAllCategories()
  const total = getAllItems().length

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-12 py-[18px] border-b border-[var(--rule)] bg-[var(--bg)]">
      <Link
        href="/"
        className="font-serif italic text-base text-[var(--text)] hover:text-[var(--accent)] transition-colors"
      >
        The Harold Collection
      </Link>

      <ul className="flex gap-7 list-none">
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              href={`/${cat}`}
              className="label hover:text-[var(--text)] transition-colors"
            >
              {formatCategory(cat)}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/collection" className="label hover:text-[var(--text)] transition-colors">
            All Works
          </Link>
        </li>
      </ul>

      <span className="label">{total} works</span>
    </nav>
  )
}
