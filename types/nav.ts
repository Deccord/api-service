export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items?: NavItem[]
}