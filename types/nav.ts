export interface NavItem {
  title: string
  href?: string
  description?: string
  items?: NavItem[]
}

export interface NavSection {
  title: string
  items?: NavItem[]
}