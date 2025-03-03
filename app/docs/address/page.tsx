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

export default function AddressPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const pathname = usePathname()
  const { prev, next } = getPagerForPath(navigation, pathname)

  const exampleAddress = "DAJ88XgDfp1XrnuaLQ1ods7izJUMSbyLMa"
  const curlRequest = `curl ${config.web.apiUrl}/api/address/balance/${exampleAddress}`
  const fetchRequest = `fetch("${config.web.apiUrl}/api/address/balance/${exampleAddress}")
  .then(response => response.json())
  .then(data => console.log(data));`

  const exampleResponse = `// Example 1 - Address with large balance (in ${config.blockchain.symbol})
{
  "balance": 500000,
  "balance_immature": 0,
  "balance_spendable": 500000,
  "received": 500000
}

// Example 2 - Address with decimal balance (in ${config.blockchain.symbol})
{
  "balance": 278.63821319,
  "balance_immature": 0,
  "balance_spendable": 278.63821319,
  "received": 292.13821319
}`

  const responseFields = [
    {
      field: 'balance',
      description: `Total balance in ${config.blockchain.symbol}. Can be shown as integer (${config.blockchain.unitName}s) or decimal (${config.blockchain.symbol})`,
    },
    {
      field: 'balance_immature',
      description: `Immature balance from mining rewards in ${config.blockchain.symbol}`,
    },
    {
      field: 'balance_spendable',
      description: `Available balance that can be spent in ${config.blockchain.symbol}`,
    },
    {
      field: 'received',
      description: `Total amount ever received by this address in ${config.blockchain.symbol}`,
    },
  ]

  const handleTestApi = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${config.web.apiUrl}/api/address/${exampleAddress}`)
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
        <h1 className="text-3xl font-bold mb-4">Address Balance</h1>
        <p className="text-gray-600 mb-8">
          Get balance information for a specific address
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get Address Balance</CardTitle>
              <CardDescription>
                Returns current balance information for an address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    GET /api/address/balance/:address
                  </code>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Parameters</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                    <li><code>address</code> - The address to retrieve information for</li>
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
                    <p className="mt-4 text-sm text-muted-foreground">
                      Note: Values can be returned either as integers (in {config.blockchain.unitName}s) or as decimals (in {config.blockchain.symbol}). 
                      1 {config.blockchain.symbol} = {config.blockchain.units} {config.blockchain.unitName}s ({config.blockchain.decimals} decimal places).
                    </p>
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