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

export default function TransactionPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const pathname = usePathname()
  const { prev, next } = getPagerForPath(navigation, pathname)

  const exampleTxid = "cf973ad2f8f3d5638255e0b29434c44e0184a2204cf834ad2f666d103a697ea3"
  const curlRequest = `curl ${config.web.apiUrl}/api/tx/${exampleTxid}`
  const fetchRequest = `fetch("${config.web.apiUrl}/api/tx/${exampleTxid}")
  .then(response => response.json())
  .then(data => console.log(data));`

  const exampleResponse = `{
  "txid": "cf973ad2f8f3d5638255e0b29434c44e0184a2204cf834ad2f666d103a697ea3",
  "hash": "cf973ad2f8f3d5638255e0b29434c44e0184a2204cf834ad2f666d103a697ea3",
  "version": 2,
  "size": 225,
  "vsize": 225,
  "weight": 900,
  "locktime": 0,
  "vin": [
    {
      "txid": "previous_txid",
      "vout": 1,
      "scriptSig": {
        "asm": "...",
        "hex": "..."
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 100.00000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "...",
        "hex": "...",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "address1"
        ]
      }
    }
  ],
  "hex": "...",
  "blockhash": "...",
  "confirmations": 1234,
  "time": 1624304000,
  "blocktime": 1624304000
}`

  const handleTestApi = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${config.web.apiUrl}/api/tx/${exampleTxid}`)
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
        <h1 className="text-3xl font-bold mb-4">Transaction Details</h1>
        <p className="text-gray-600 mb-8">
          Get detailed information about a specific transaction
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get Transaction</CardTitle>
              <CardDescription>
                Returns detailed information about a transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    GET /api/tx/:txid
                  </code>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Parameters</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                    <li><code>txid</code> - The transaction ID to retrieve</li>
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