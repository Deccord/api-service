import { config } from '@/config'

interface RpcError {
  code: number;
  message: string;
}

interface RpcResponse<T> {
  result?: T;
  error?: RpcError;
  id: number;
}

export const block = {
  async getHeight(): Promise<number> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getblockcount',
          params: [],
          id: 1
        }),
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`RPC request failed: ${response.status} ${response.statusText}`)
      }

      const data: RpcResponse<number> = await response.json()
      
      if (data.error) {
        throw new Error(`RPC error: ${data.error.message}`)
      }

      return data.result ?? 0
    } catch (error) {
      console.error('Block height fetch error:', error)
      throw error
    }
  },

  async getBlockHash(height: number): Promise<string> {
    try {
      const response = await fetch(config.rpc.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.rpc.user}:${config.rpc.pass}`).toString('base64')}`
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getblockhash',
          params: [height],
          id: 1
        }),
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`RPC request failed: ${response.status} ${response.statusText}`)
      }

      const data: RpcResponse<string> = await response.json()
      
      if (data.error) {
        throw new Error(`RPC error: ${data.error.message}`)
      }

      return data.result ?? ''
    } catch (error) {
      console.error('Block hash fetch error:', error)
      throw error
    }
  }
}