"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navigation } from '@/config/nav'
import { NavItem } from '@/types/nav'

export function DocsNav() {
  const pathname = usePathname()

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      if (item.items) {
        return (
          <div key={item.title} className="space-y-2">
            <h5 className="font-medium text-sm px-3">{item.title}</h5>
            <div className="pl-3 space-y-1">
              {renderNavItems(item.items)}
            </div>
          </div>
        )
      }

      return item.href ? (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
            pathname === item.href && "bg-accent"
          )}>
          <div className="text-sm font-medium leading-none">{item.title}</div>
          {item.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          )}
        </Link>
      ) : null
    })
  }

  return (
    <div className="w-full space-y-6">
      {navigation.map((section) => (
        <div key={section.title} className="space-y-3">
          <h4 className="font-medium">{section.title}</h4>
          {section.items && (
            <div className="grid gap-2">
              {renderNavItems(section.items)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}