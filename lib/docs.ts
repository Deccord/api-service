import { NavItem, NavSection } from '@/types/nav'

export function getPagerForPath(navigation: NavSection[], currentPath: string): { prev?: NavItem; next?: NavItem } {
  // Flatten all items into a single array
  const allItems = navigation.flatMap(section => section.items || [])
  
  // Find current item index
  const currentIndex = allItems.findIndex(item => item.href === currentPath)
  
  // Get prev and next items
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : undefined
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined
  
  return { prev, next }
}