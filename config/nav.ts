import { NavSection } from '@/types/nav'

export const navigation: NavSection[] = [
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
        items: [
          {
            title: 'Get Block Height',
            href: '/docs/blocks',
            description: 'Get current block height',
          },
          {
            title: 'Get Block Details',
            href: '/docs/blocks/details',
            description: 'Get detailed block information by hash',
          }
        ]
      },
      {
        title: 'Blockchain',
        href: '/docs/blockchain',
        description: 'Get blockchain network information',
      },
    ],
  },
]