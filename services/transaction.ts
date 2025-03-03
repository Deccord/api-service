import { config } from '@/config'

interface TransactionInfo {
  txid: string
  hash: string
  version: number
  size: number
  vsize: number
  weight: number
  locktime: number
  vin: { txid: string, vout: number, scriptSig: { asm: string, hex: string }, sequence: number }[]
  vout: { value: number, n: number, scriptPubKey: { asm: string, hex: string, reqSigs?: number, type: string, addresses?: string[] } }[]
  hex: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export const transaction = {
  async getTransaction(txid: string): Promise<TransactionInfo> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getrawtransaction',
          params: [txid, true],
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

      return data.result
    } catch (error) {
      console.error('Transaction fetch error:', error)
      throw error
    }
  }
}