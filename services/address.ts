import { config } from '@/config'

interface AddressInfo {
  balance: number
  balance_immature: number
  balance_spendable: number
  received: number
  txids?: string[]
}

export const address = {
  async getAddressInfo(address: string): Promise<AddressInfo> {
    try {
      // Get address balance with correct params format
      const balanceResponse = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getaddressbalance',
          params: [{ "addresses": [address] }],
          id: 1
        }),
        cache: 'no-store'
      })

      if (!balanceResponse.ok) {
        throw new Error(`RPC request failed: ${balanceResponse.status} ${balanceResponse.statusText}`)
      }

      const balanceData = await balanceResponse.json()
      
      if (balanceData.error) {
        throw new Error(`RPC error: ${balanceData.error.message}`)
      }

      // Convert satoshis to DCD
      return {
        balance: balanceData.result.balance / 1e8,
        balance_immature: balanceData.result.balance_immature / 1e8,
        balance_spendable: balanceData.result.balance_spendable / 1e8,
        received: balanceData.result.received / 1e8
      }
    } catch (error) {
      console.error('Address info fetch error:', error)
      throw error
    }
  }
}