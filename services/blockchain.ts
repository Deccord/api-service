import { config } from '@/config'

interface SoftForkBip9 {
  status: string
  start_time: number
  timeout: number
  ehf: boolean
  since: number
}

interface SoftFork {
  type: string
  active: boolean
  height?: number
  bip9?: SoftForkBip9
}

interface BlockchainInfo {
  chain: string
  blocks: number
  headers: number
  bestblockhash: string
  difficulty: number
  mediantime: number
  verificationprogress: number
  initialblockdownload: boolean
  chainwork: string
  size_on_disk: number
  pruned: boolean
  softforks: {
    [key: string]: SoftFork
  }
  warnings: string
}

export const blockchain = {
  async getInfo(): Promise<BlockchainInfo> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getblockchaininfo',
          params: [],
          id: 1
        }),
        cache: 'no-store'
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('RPC request failed:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`RPC request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.error) {
        console.error('RPC error:', data.error)
        throw new Error(`RPC error: ${data.error.message}`)
      }

      return data.result
    } catch (error) {
      console.error('Blockchain info fetch error:', error)
      throw error
    }
  }
}