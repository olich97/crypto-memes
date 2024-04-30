import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const meta = {
  title: 'Privacy Policy',
  description: 'Crypto Memes Privacy Policy',
  url: `${WEBSITE_HOST_URL}/privacy`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
  alternates: {
    canonical: meta.url,
  },
}

export default function Privacy() {
  return (
    <div className="space-y-7">
      <h1>Privacy Policy</h1>
      <p>Welcome to the privacy policy page</p>
    </div>
  )
}
