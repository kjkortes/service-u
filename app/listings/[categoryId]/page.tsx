import { categories } from '@/data'
import ListingsPageClient from './ListingsPageClient'

export function generateStaticParams() {
  return categories.map((cat) => ({ categoryId: cat.id }))
}

export default function ListingsPage() {
  return <ListingsPageClient />
}
