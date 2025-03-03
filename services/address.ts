import { config } from '@/config'

interface AddressInfo {
  balance: number
  balance_immature: number
  balance_spendable: number
  received: number
  txids?: string[]
}

interface AddressTransaction {
  txid: string
  time: number
  amount: number
  confirmations: number
  blockhash: string
}

interface TransactionOptions {
  limit?: number
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
  },

  async getTransactions(address: string, options: TransactionOptions = {}): Promise<AddressTransaction[]> {
    const limit = Math.min(options.limit || 10, 100) // Default 10, max 100

    try {
      // First get txids for the address
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getaddresstxids',
          params: [{ "addresses": [address] }],
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

      if (!Array.isArray(data.result)) {
        throw new Error('Invalid response format: expected array of txids')
      }

      // Get only the latest transactions based on limit
      const txids = data.result.slice(0, limit)

      // Get transaction details for each txid
      const txPromises = txids.map(async (txid: string) => {
        try {
          const txResponse = await fetch(config.rpc.url, {
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

          const txData = await txResponse.json()
          
          if (txData.error) {
            console.error(`Error fetching tx ${txid}:`, txData.error)
            return null
          }

          return {
            txid: txData.result.txid,
            time: txData.result.time,
            amount: txData.result.vout.reduce((sum: number, vout: { value: number }) => 
              sum + (vout.value || 0), 0),
            confirmations: txData.result.confirmations || 0,
            blockhash: txData.result.blockhash || ''
          }
        } catch (error) {
          console.error(`Error processing tx ${txid}:`, error)
          return null
        }
      })

      const transactions = (await Promise.all(txPromises))
        .filter((tx): tx is AddressTransaction => tx !== null)
        .sort((a, b) => b.time - a.time)

      return transactions
    } catch (error) {
      console.error('Address transactions fetch error:', error)
      throw error
    }
  }
}