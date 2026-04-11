import { notFound } from 'next/navigation'
import { getAllCategories, getItemsByCategory, getTagsForCategory } from '@/lib/content'
import Breadcrumb from '@/components/Breadcrumb'
import CategoryClient from '@/components/CategoryClient'

function formatCategory(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return { title: `${formatCategory(category)} — The Harold Collection` }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  const validCategories = getAllCategories()
  if (!validCategories.includes(category)) notFound()

  const items = getItemsByCategory(category)
  const allTags = getTagsForCategory(category)

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: formatCategory(category) }]} />
      <div className="flex justify-between items-center px-12 py-[18px] border-b border-[var(--rule)] bg-[var(--bg2)]">
        <span className="label">{formatCategory(category)}</span>
        <span className="label">{items.length} works</span>
      </div>
      <CategoryClient items={items} category={category} allTags={allTags} />
    </>
  )
}
