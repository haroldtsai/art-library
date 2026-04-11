export interface ArtworkRef {
  label: string
  url: string
}

export interface ArtworkItem {
  // --- required ---
  slug: string
  category: string
  title: string
  image: string

  // --- optional metadata ---
  artist?: string
  label?: string        // record label or manufacturer
  year?: number
  medium?: string       // e.g. "Oil on Canvas"
  size?: string
  acquired?: string
  genre?: string
  decade?: string

  // --- content ---
  tags?: string[]
  featured?: boolean
  images?: string[]     // additional photos
  refs?: ArtworkRef[]
  dateAdded?: string    // ISO date string, used for sort

  // --- rendered body ---
  content: string       // raw Markdown
}

export type SortKey = 'year' | 'title' | 'dateAdded'
export type SortDir = 'asc' | 'desc'
