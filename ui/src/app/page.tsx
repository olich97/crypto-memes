import { Button } from '@/components/ui/button'
import Search from '@/components/ui/search-bar'
import { compareDesc } from 'date-fns'
import { Github } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* 
      <div className="space-y-7">
        <h1>Home Page</h1>
        <p>
          Next.js starter template for your next blog or personal site. Built
          with:
        </p>
        <ul className="my-6 list-disc space-y-2 pl-4">
          <li>
            <Link className="link" href="https://nextjs.org/docs/app">
              Next.js - App Router
            </Link>
          </li>
          <li>
            <Link className="link" href="https://www.contentlayer.dev/">
              Contentlayer
            </Link>
          </li>
          <li>
            <Link className="link" href="https://mdxjs.com/">
              MDX
            </Link>
          </li>
          <li>
            <Link className="link" href="https://ui.shadcn.com/">
              shadcn-ui
            </Link>
          </li>
          <li>
            <Link className="link" href="https://tailwindcss.com/">
              Tailwind CSS
            </Link>
          </li>
        </ul>

        <Button asChild>
          <a href="https://github.com/ChangoMan/nextjs-mdx-blog">
            <Github className="mr-1" /> Get the source code!
          </a>
        </Button>
      </div> */}

      <div className="mt-4">
       <Search />
      </div>
      <div className="mt-10 space-y-12">
        {}
      </div>
    </div>
  )
}
