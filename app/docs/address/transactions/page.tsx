"use client"

import { useState } from "react"
import { usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CodeBlock from '@/components/CodeBlock'
import { config } from '@/config'
import { DocsPager } from '@/components/DocsPager'
import { navigation } from '@/config/nav'
import { getPagerForPath } from '@/lib/docs'

export default function AddressTransactionsPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const pathname = usePathname()
  const { prev, next } = getPagerForPath(navigation, pathname)

  const exampleAddress = "DAJ88XgDfp1XrnuaLQ1ods7izJUMSbyLMa"
  const curlRequest = `# Default (latest 10 transactions)
curl ${config.web.apiUrl}/api/address/${exampleAddress}/transactions

# With limit parameter (up to 100)
curl ${config.web.apiUrl}/api/address/${exampleAddress}/transactions?limit=20`

  const fetchRequest = `// Default (latest 10 transactions)
fetch("${config.web.apiUrl}/api/address/${exampleAddress}/transactions")
  .then(response => response.json())
  .then(data => console.log(data));

// With limit parameter (up to 100)
fetch("${config.web.apiUrl}/api/address/${exampleAddress}/transactions?limit=20")
  .then(response => response.json())
  .then(data => console.log(data));`

  const exampleResponse = `{
  "transactions": [
    {
      "txid": "cf973ad2f8f3d5638255e0b29434c44e0184a2204cf834ad2f666d103a697ea3",
      "time": 1709491200,
      "amount": 500.00000000,
      "confirmations": 1234,
      "blockhash": "000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      "txid": "7b5685d958a5bcc3af0c86cdd5e3a76c3e2a717c6ad03d739d147b5379363b6f",
      "time": 1709404800,
      "amount": 278.63821319,
      "confirmations": 5678,
      "blockhash": "000000000000000000000000000000000000000000000000000000000000000"
    }
  ]
}`

  const responseFields = [
    {
      field: 'txid',
      description: 'Transaction ID',
    },
    {
      field: 'time',
      description: 'Transaction timestamp in Unix format',
    },
    {
      field: 'amount',
      description: `Transaction amount in ${config.blockchain.symbol}`,
    },
    {
      field: 'confirmations',
      description: 'Number of confirmations for this transaction',
    },
    {
      field: 'blockhash',
      description: 'Hash of the block containing this transaction',
    },
  ]

  const handleTestApi = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${config.web.apiUrl}/api/address/${exampleAddress}/transactions`)
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch {
      setResult('Error: Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Address Transactions</h1>
        <p className="text-gray-600 mb-8">
          Get transaction history for a specific address
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get Address Transactions</CardTitle>
              <CardDescription>
                Returns list of transactions for an address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    GET /api/address/:address/transactions
                  </code>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Parameters</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                    <li><code>address</code> - The address to retrieve transactions for</li>
                    <li><code>limit</code> - (Optional) Number of transactions to return (default: 10, max: 100)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Code Examples</h3>
                  <Tabs defaultValue="curl" className="w-full">
                    <TabsList>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="fetch">Fetch</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl">
                      <CodeBlock code={curlRequest} />
                    </TabsContent>
                    <TabsContent value="fetch">
                      <CodeBlock code={fetchRequest} />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Response Format</h3>
                  <CodeBlock code={exampleResponse} />
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Response Fields:</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                      {responseFields.map(({ field, description }) => (
                        <li key={field}>
                          <code>{field}</code> - {description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Try It Out</CardTitle>
              <CardDescription>
                Test the API endpoint directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={handleTestApi}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? 'Fetching...' : 'Send Request'}
                </Button>
                {result && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Response:</h4>
                    <CodeBlock code={result} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <DocsPager prev={prev} next={next} />
      </div>
    </div>
  )
}