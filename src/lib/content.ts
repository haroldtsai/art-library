import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ArtworkItem } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ── helpers ────────────────────────────────────────────────────────────────

function readItem(category: string, filename: string): ArtworkItem | null {
  if (!filename.endsWith('.md')) return null

  const slug = filename.replace(/\.md$/, '')
  const filePath = path.join(CONTENT_DIR, category, filename)

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      category,
      title: data.title ?? slug,
      image: data.image ?? '',
      artist: data.artist,
      label: data.label,
      year: data.year,
      medium: data.medium,
      size: data.size,
      acquired: data.acquired,
      genre: data.genre,
      decade: data.decade ?? (data.year ? `${Math.floor(data.year / 10) * 10}s` : undefined),
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      images: data.images ?? [],
      refs: data.refs ?? [],
      dateAdded: data.dateAdded,
      content,
    }
  } catch {
    return null
  }
}

// ── public API ─────────────────────────────────────────────────────────────

/** All category names (folder names under /content that contain ≥1 .md file) */
export function getAllCategories(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => {
      const dir = path.join(CONTENT_DIR, name)
      return fs.readdirSync(dir).some((f) => f.endsWith('.md'))
    })
}

/** Every artwork across all categories */
export function getAllItems(): ArtworkItem[] {
  return getAllCategories().flatMap((cat) => getItemsByCategory(cat))
}

/** All artworks in a single category, sorted by dateAdded desc by default */
export function getItemsByCategory(category: string): ArtworkItem[] {
  const dir = path.join(CONTENT_DIR, category)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .map((filename) => readItem(category, filename))
    .filter((item): item is ArtworkItem => item !== null)
    .sort((a, b) => {
      if (a.dateAdded && b.dateAdded) {
        return b.dateAdded.localeCompare(a.dateAdded)
      }
      return 0
    })
}

/** Single item by category + slug; returns null if not found */
export function getItem(category: string, slug: string): ArtworkItem | null {
  return readItem(category, `${slug}.md`)
}

/** Items with featured: true, sorted by dateAdded desc */
export function getFeaturedItems(): ArtworkItem[] {
  return getAllItems()
    .filter((item) => item.featured)
    .sort((a, b) => {
      if (a.dateAdded && b.dateAdded) return b.dateAdded.localeCompare(a.dateAdded)
      return 0
    })
}

/** Item count per category */
export function getCategoryCounts(): Record<string, number> {
  return Object.fromEntries(
    getAllCategories().map((cat) => [cat, getItemsByCategory(cat).length])
  )
}

/** All unique tag values for a given category */
export function getTagsForCategory(category: string): string[] {
  const items = getItemsByCategory(category)
  const tags = new Set<string>()
  items.forEach((item) => item.tags?.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}

/** All unique values for a given frontmatter field in a category */
export function getFieldValuesForCategory(category: string, field: keyof ArtworkItem): string[] {
  const items = getItemsByCategory(category)
  const values = new Set<string>()
  items.forEach((item) => {
    const val = item[field]
    if (typeof val === 'string') values.add(val)
  })
  return Array.from(values).sort()
}
