import { config } from '@/config'

interface Block {
  hash: string
  confirmations: number
  size: number
  height: number
  version: number
  versionHex: string
  merkleroot: string
  time: number
  mediantime: number
  nonce: number
  bits: string
  difficulty: number
  chainwork: string
  previousblockhash: string
  nextblockhash?: string
  tx: string[]
}

export const blockdetails = {
  async getBlock(hash: string): Promise<Block> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getblock',
          params: [hash, 1],
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
      console.error('Block details fetch error:', error)
      throw error
    }
  }
}