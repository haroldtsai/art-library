import fs from 'fs'
import path from 'path'
import os from 'os'

// Point CONTENT_DIR at a temp fixture directory for tests
let tmpDir: string

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'art-test-'))
  jest.resetModules()
  // Override process.cwd() to point at tmpDir
  jest.spyOn(process, 'cwd').mockReturnValue(tmpDir)
})

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true })
  jest.restoreAllMocks()
})

function writeItem(category: string, slug: string, frontmatter: object, body = '') {
  const dir = path.join(tmpDir, 'content', category)
  fs.mkdirSync(dir, { recursive: true })
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n')
  fs.writeFileSync(path.join(dir, `${slug}.md`), `---\n${fm}\n---\n${body}`)
}

describe('getAllCategories', () => {
  it('returns categories that have at least one .md file', async () => {
    writeItem('vinyl', 'test', { title: 'Test', image: 'x' })
    fs.mkdirSync(path.join(tmpDir, 'content', 'empty-cat'), { recursive: true })

    const { getAllCategories } = await import('../content')
    expect(getAllCategories()).toEqual(['vinyl'])
  })

  it('returns empty array when content dir does not exist', async () => {
    const { getAllCategories } = await import('../content')
    expect(getAllCategories()).toEqual([])
  })
})

describe('getItem', () => {
  it('parses required fields correctly', async () => {
    writeItem('painting', 'my-painting', { title: 'My Painting', image: '/img.jpg', year: 2020 })
    const { getItem } = await import('../content')
    const item = getItem('painting', 'my-painting')
    expect(item).not.toBeNull()
    expect(item!.title).toBe('My Painting')
    expect(item!.year).toBe(2020)
    expect(item!.slug).toBe('my-painting')
  })

  it('returns null for unknown slug', async () => {
    fs.mkdirSync(path.join(tmpDir, 'content', 'vinyl'), { recursive: true })
    const { getItem } = await import('../content')
    expect(getItem('vinyl', 'does-not-exist')).toBeNull()
  })

  it('handles missing optional fields gracefully', async () => {
    writeItem('sculpture', 'piece', { title: 'Piece', image: '/x.jpg' })
    const { getItem } = await import('../content')
    const item = getItem('sculpture', 'piece')
    expect(item!.artist).toBeUndefined()
    expect(item!.tags).toEqual([])
    expect(item!.refs).toEqual([])
    expect(item!.featured).toBe(false)
  })

  it('returns empty content string when body is absent', async () => {
    writeItem('vinyl', 'no-body', { title: 'No Body', image: '/x.jpg' }, '')
    const { getItem } = await import('../content')
    const item = getItem('vinyl', 'no-body')
    expect(item!.content.trim()).toBe('')
  })
})

describe('getItemsByCategory', () => {
  it('returns empty array for unknown category', async () => {
    const { getItemsByCategory } = await import('../content')
    expect(getItemsByCategory('nonexistent')).toEqual([])
  })

  it('returns items sorted by dateAdded descending', async () => {
    writeItem('vinyl', 'a', { title: 'A', image: '/a.jpg', dateAdded: '2023-01-01' })
    writeItem('vinyl', 'b', { title: 'B', image: '/b.jpg', dateAdded: '2024-06-01' })
    const { getItemsByCategory } = await import('../content')
    const items = getItemsByCategory('vinyl')
    expect(items[0].slug).toBe('b')
    expect(items[1].slug).toBe('a')
  })
})

describe('getFeaturedItems', () => {
  it('returns only featured items', async () => {
    writeItem('vinyl', 'feat', { title: 'Featured', image: '/f.jpg', featured: true })
    writeItem('vinyl', 'plain', { title: 'Plain', image: '/p.jpg', featured: false })
    const { getFeaturedItems } = await import('../content')
    const featured = getFeaturedItems()
    expect(featured).toHaveLength(1)
    expect(featured[0].slug).toBe('feat')
  })
})
