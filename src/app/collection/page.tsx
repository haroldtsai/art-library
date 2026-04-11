import { getAllItems, getFeaturedItems, getAllCategories } from '@/lib/content'
import CollectionClient from '@/components/CollectionClient'

export const metadata = {
  title: 'Collection — The Harold Collection',
}

export default function CollectionPage() {
  const allItems = getAllItems()
  const featured = getFeaturedItems()
  const categories = getAllCategories()

  return <CollectionClient allItems={allItems} featured={featured} categories={categories} />
}
