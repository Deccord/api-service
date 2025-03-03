import { NavItem, NavSection } from '@/types/nav'

export function getPagerForPath(navigation: NavSection[], currentPath: string): { 
  prev?: Pick<Required<NavItem>, 'href' | 'title'>,
  next?: Pick<Required<NavItem>, 'href' | 'title'> 
} {
  // Create flattened array of all navigable items
  const flattenedItems: NavItem[] = []
  
  navigation.forEach(section => {
    section.items?.forEach(item => {
      if (item.items) {
        // Add nested items
        item.items.forEach(subItem => {
          if (subItem.href) {
            flattenedItems.push(subItem)
          }
        })
      } else if (item.href) {
        // Add top-level items
        flattenedItems.push(item)
      }
    })
  })

  // Find current item index
  const currentIndex = flattenedItems.findIndex(item => item.href === currentPath)
  
  // Get prev and next items
  const prev = currentIndex > 0 ? {
    href: flattenedItems[currentIndex - 1].href!,
    title: flattenedItems[currentIndex - 1].title
  } : undefined

  const next = currentIndex < flattenedItems.length - 1 ? {
    href: flattenedItems[currentIndex + 1].href!,
    title: flattenedItems[currentIndex + 1].title
  } : undefined
  
  return { prev, next }
}