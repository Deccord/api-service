export const config = {
  web: {
    name: process.env.APP_NAME || 'DCD API',
    title: process.env.APP_TITLE || 'DCD Blockchain API Documentation',
    description: process.env.APP_DESCRIPTION || 'Public REST API for accessing DCD blockchain data',
    url: process.env.APP_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3001'
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