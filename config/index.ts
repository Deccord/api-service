export const config = {
  web: {
    name: process.env.NEXT_PUBLIC_APP_NAME!,
    title: process.env.NEXT_PUBLIC_APP_TITLE!,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION!,
    url: process.env.NEXT_PUBLIC_APP_URL!,
    apiUrl: process.env.NEXT_PUBLIC_API_URL!
  },
  blockchain: {
    name: process.env.CHAIN_NAME || 'Deccord',
    symbol: process.env.CHAIN_SYMBOL || 'DCD',
    decimals: Number(process.env.CHAIN_DECIMALS) || 8,
    units: Number(process.env.CHAIN_UNITS) || 100000000,
    unitName: process.env.CHAIN_UNIT_NAME || 'decca'
  },
  rpc: {
    url: process.env.RPC_URL || 'http://localhost:22945',
    user: process.env.RPC_USER || '',
    pass: process.env.RPC_PASS || ''
  }
}