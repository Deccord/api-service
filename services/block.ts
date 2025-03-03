import { config } from '@/config'

interface BlockResponse {
  height: number;
}

interface RpcError {
  code: number;
  message: string;
}

interface RpcResponse {
  result?: number;
  error?: RpcError;
  id: number;
}

export const block = {
  async getBlockHeight(): Promise<BlockResponse> {
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
        const errorText = await response.text()
        console.error('RPC request failed:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`RPC request failed: ${response.status} ${response.statusText}`)
      }

      const data: RpcResponse = await response.json()
      
      if (data.error) {
        console.error('RPC error:', data.error)
        throw new Error(`RPC error: ${data.error.message}`)
      }

      if (typeof data.result !== 'number') {
        throw new Error('Invalid response: missing block height')
      }

      return { height: data.result }
    } catch (error) {
      console.error('Block height fetch error:', error)
      throw error
    }
  }
}