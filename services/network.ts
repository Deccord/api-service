import { config } from '@/config'

interface TxOutSetInfo {
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bogosize: number
  hash_serialized_2: string
  disk_size: number
  total_amount: number
}

const PREMINE_AMOUNT = 500000 // Define premine constant

export const network = {
  async getHashrate(): Promise<number> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getnetworkhashps',
          params: [],
          id: 1
        }),
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`RPC request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.result
    } catch (error) {
      console.error('Network hashrate fetch error:', error)
      throw error
    }
  },

  async getSupply(): Promise<number> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'gettxoutsetinfo',
          params: [],
          id: 1
        }),
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`RPC request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(`RPC error: ${data.error.message}`)
      }

      const txoutsetinfo: TxOutSetInfo = data.result
      const supply = txoutsetinfo.total_amount - PREMINE_AMOUNT
      
      // Format with correct number of decimals from config
      return Number(supply.toFixed(config.blockchain.decimals))
    } catch (error) {
      console.error('Supply fetch error:', error)
      throw error
    }
  }
}