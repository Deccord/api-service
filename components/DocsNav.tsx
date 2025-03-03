"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
  description?: string
}

interface NavSection {
  title: string
  items?: NavItem[]
}

const navigation: NavSection[] = [
  {
    title: 'Introduction',
    items: [
      {
        title: 'Overview',
        href: '/docs',
        description: 'Introduction to DCD Blockchain API',
      },
      {
        title: 'Getting Started',
        href: '/docs/getting-started',
        description: 'Learn how to use the API',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Blocks',
        href: '/docs/blocks',
        description: 'Get block height and information',
      },
    ],
  },
]

export function DocsNav() {
  const pathname = usePathname()

  return (
    <div className="w-full space-y-6">
      {navigation.map((section) => (
        <div key={section.title} className="space-y-3">
          <h4 className="font-medium">{section.title}</h4>
          {section.items && (
            <div className="grid gap-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href && "bg-accent"
                  )}
                >
                  <div className="text-sm font-medium leading-none">{item.title}</div>
                  {item.description && (
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}