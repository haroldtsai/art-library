import type { ArtworkItem, SortKey } from '@/lib/types'

export interface CategoryFilterConfig {
  /** Frontmatter fields rendered as tab-bar filters */
  tabs?: (keyof ArtworkItem)[]
  /** Frontmatter fields rendered as pill filters (multi-select) */
  pills?: (keyof ArtworkItem)[]
  /** Frontmatter fields available as sort keys */
  sort?: SortKey[]
}

export type FilterConfig = Record<string, CategoryFilterConfig>

const filters: FilterConfig = {
  vinyl: {
    tabs: ['genre', 'decade'],
    pills: ['tags'],
    sort: ['year', 'title', 'dateAdded'],
  },
  cd: {
    tabs: ['genre', 'decade'],
    pills: ['tags'],
    sort: ['year', 'title', 'dateAdded'],
  },
  painting: {
    tabs: [],
    pills: ['tags', 'medium'],
    sort: ['year', 'dateAdded'],
  },
  sculpture: {
    tabs: [],
    pills: ['tags', 'medium'],
    sort: ['year', 'dateAdded'],
  },
  furniture: {
    tabs: [],
    pills: ['tags'],
    sort: ['year', 'dateAdded'],
  },
  'my-works': {
    tabs: [],
    pills: ['tags', 'medium'],
    sort: ['year', 'dateAdded'],
  },
}

export default filters
