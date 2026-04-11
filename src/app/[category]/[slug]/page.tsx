import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllCategories, getItemsByCategory, getItem } from '@/lib/content'
import Breadcrumb from '@/components/Breadcrumb'
import ItemGallery from '@/components/ItemGallery'
import ArtCard from '@/components/ArtCard'
import VinylCard from '@/components/VinylCard'

const MUSIC_CATS = ['vinyl', 'cd']

function formatCategory(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.flatMap((category) =>
    getItemsByCategory(category).map((item) => ({ category, slug: item.slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params
  const item = getItem(category, slug)
  if (!item) return {}
  return {
    title: `${item.title} — The Harold Collection`,
    description: item.content.slice(0, 150).replace(/\n/g, ' '),
    openGraph: { images: item.image ? [item.image] : [] },
  }
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const item = getItem(category, slug)
  if (!item) notFound()

  const catItems = getItemsByCategory(category)
  const related = catItems.filter((i) => i.slug !== slug).slice(0, 4)
  const isMusic = MUSIC_CATS.includes(category)

  const metaFields: { label: string; value: string | number | undefined }[] = [
    { label: 'Artist', value: item.artist },
    { label: 'Label', value: item.label },
    { label: 'Year', value: item.year },
    { label: 'Medium', value: item.medium },
    { label: 'Size', value: item.size },
    { label: 'Acquired', value: item.acquired },
  ].filter((f) => f.value !== undefined && f.value !== '')

  return (
    <>
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: formatCategory(category), href: `/${category}` },
        { label: item.title },
      ]} />

      {/* Body: image left / content right on desktop, stacked on mobile */}
      <div className="grid md:grid-cols-[2fr_3fr] border-b border-[var(--rule)]">

        {/* Left: Image */}
        <div className="md:border-r border-b md:border-b-0 border-[var(--rule)]">
          <ItemGallery
            primary={item.image}
            title={item.title}
            extras={item.images ?? []}
            captionLabel={[formatCategory(category), item.year].filter(Boolean).join(' · ')}
          />
        </div>

        {/* Right: Content + Metadata */}
        <div className="grid md:grid-rows-[1fr_auto]">

          {/* Main */}
          <div className="px-12 py-10 border-b border-[var(--rule)]">
            <p className="label">{formatCategory(category)}</p>
            <h1 className="font-serif italic text-[var(--text)] mt-3 mb-2 leading-tight"
              style={{ fontSize: '2.25rem' }}>
              {item.title}
            </h1>

            <div className="rule-sm" style={{ margin: '1.25rem 0' }} />

            {/* Notes */}
            {item.content.trim() && (
              <div
                className="font-serif text-[0.9375rem] leading-[1.95] border-l-2 border-[var(--rule)] pl-5"
                style={{ color: '#6b6358' }}
              >
                <MDXRemote source={item.content} />
              </div>
            )}

            {/* Tags */}
            {(item.tags ?? []).length > 0 && (
              <div className="flex gap-2 flex-wrap mt-6">
                {item.tags!.map((tag) => (
                  <Link key={tag} href={`/${category}?tag=${tag}`}
                    className="label px-3 py-1 border border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* External refs */}
            {(item.refs ?? []).length > 0 && (
              <div className="mt-7">
                <p className="label mb-[10px]">References</p>
                {item.refs!.map((ref) => (
                  <a key={ref.url} href={ref.url} target="_blank" rel="noopener noreferrer"
                    className="label block mb-[6px] hover:text-[var(--accent)] transition-colors">
                    → {ref.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="px-9 py-8 bg-[var(--bg2)]">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {metaFields.map((f) => (
                <div key={f.label}>
                  <p className="label mb-[3px]">{f.label}</p>
                  <p className="font-serif text-[var(--text)] text-sm">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <>
          <div className="flex justify-between items-center px-12 py-[18px] border-b border-[var(--rule)] border-t border-t-[var(--rule)] bg-[var(--bg2)]">
            <span className="label">Related Works</span>
            <Link href={`/${category}`} className="label hover:text-[var(--text)] transition-colors">
              More {formatCategory(category)} →
            </Link>
          </div>
          <div className="grid gap-px bg-[var(--rule)] border-b border-[var(--rule)]"
            style={{ gridTemplateColumns: isMusic ? 'repeat(4, 1fr)' : '1fr 1fr' }}>
            {related.map((r) =>
              isMusic
                ? <VinylCard key={r.slug} item={r} />
                : <ArtCard key={r.slug} item={r} />
            )}
          </div>
        </>
      )}
    </>
  )
}
