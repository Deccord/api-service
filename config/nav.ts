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
            title: 'Get Block Hash',
            href: '/docs/blocks/hash',
            description: 'Get block hash by height',
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
        items: [
          {
            title: 'Get Blockchain Info',
            href: '/docs/blockchain',
            description: 'Get blockchain network information'
          }
        ]
      },
      {
        title: 'Network',
        items: [
          {
            title: 'Get Network Hashrate',
            href: '/docs/network/hashrate',
            description: 'Get current network hashrate'
          },
          {
            title: 'Get Network Supply',
            href: '/docs/network/supply',
            description: 'Get total coin supply in circulation'
          }
        ]
      }
    ],
  }
]