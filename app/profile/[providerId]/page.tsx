import { providers } from '@/_lib/data'
import ProfilePageClient from './ProfilePageClient'

export function generateStaticParams() {
  const params: { providerId: string }[] = []
  for (const catProviders of Object.values(providers)) {
    for (const p of catProviders) {
      params.push({ providerId: p.id })
    }
  }
  return params
}

export default function ProfilePage() {
  return <ProfilePageClient />
}
