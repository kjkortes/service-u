import { providers } from '@/_lib/data'
import BookingPageClient from './BookingPageClient'

export function generateStaticParams() {
  const params: { providerId: string }[] = []
  for (const catProviders of Object.values(providers)) {
    for (const p of catProviders) {
      params.push({ providerId: p.id })
    }
  }
  return params
}

export default function BookingPage() {
  return <BookingPageClient />
}
