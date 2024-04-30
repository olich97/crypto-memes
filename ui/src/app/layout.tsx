import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { Navigation } from '@/components/Navigation'
import ThemeSwitch from '@/components/ThemeSwitch'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import Link from 'next/link'
import './global.css'
import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'Crypto Memes',
  description:
    'Crypto Memes is a simple decentralized app',
  image: `${WEBSITE_HOST_URL}/og-preview.jpg`,
}

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | Crypto Memes',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="absolute -left-12 top-2 z-30 mt-3 w-48 -rotate-45 rounded-lg bg-red-500 py-1 text-center text-xs font-medium text-gray-100 md:block md:text-sm">
          <a
            className="text-white"
            target="_blank"
            rel="noreferrer"
            href="https://sepolia.etherscan.io/"
          >
            Sepolia<br></br>Testnet
          </a>
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <header className="py-4">
            <Container>
              <div className="flex items-center justify-between py-6">
                <Navigation />
                <ThemeSwitch />
              </div>
              <Separator />
            </Container>
          </header>
          <main>
            <Container>{children}</Container>
          </main>
          <footer className="py-16">
            <Container>
              <Separator />
              <div className="mt-4">
              Built by{' '}
                <Link className="link" target="_blank" href="https://github.com/olich97">
                  Oleh Andrushko
                </Link>
                <br/>
                <Link href="/privacy" className="link">
                  Privacy Policy
                </Link>
                <br/>
                <Link className="link" target="_blank" href="https://github.com/olich97/crypto-memes">
                  Source Code
                </Link>
              </div>
               
               
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
