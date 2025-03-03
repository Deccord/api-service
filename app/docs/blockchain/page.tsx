"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CodeBlock from '@/components/CodeBlock'
import { config } from '@/config'
import { DocsPager } from '@/components/DocsPager'
import { usePathname } from 'next/navigation'
import { navigation } from '@/config/nav' // Move navigation to separate file
import { getPagerForPath } from '@/lib/docs'

export default function BlockchainInfoPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const pathname = usePathname()
  const { prev, next } = getPagerForPath(navigation, pathname)

  const curlRequest = `curl ${config.web.apiUrl}/api/blockchain`
  const fetchRequest = `fetch("${config.web.apiUrl}/api/blockchain")
  .then(response => response.json())
  .then(data => console.log(data));`
  
  const exampleResponse = `{
  "chain": "main",
  "blocks": 670,
  "headers": 670,
  "bestblockhash": "0000000000001313b5777d16adb816ec585be99d684b739dad83897aa37920e1",
  "difficulty": 708602.2267808428,
  "mediantime": 1740987633,
  "verificationprogress": 1,
  "initialblockdownload": false,
  "chainwork": "000000000000000000000000000000000000000000000000118717a51504218b",
  "size_on_disk": 756916,
  "pruned": false,
  "softforks": {
    "bip34": {
      "type": "buried",
      "active": true,
      "height": 1
    }
    // ... other softforks
  },
  "warnings": ""
}`

  const handleTestApi = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${config.web.apiUrl}/api/blockchain`)
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
        <h1 className="text-3xl font-bold mb-4">Blockchain Info</h1>
        <p className="text-gray-600 mb-8">
          Get detailed information about the blockchain state and network
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get Blockchain Info</CardTitle>
              <CardDescription>
                Retrieve current blockchain information including network state and active softforks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    GET /api/blockchain
                  </code>
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

        <DocsPager 
          prev={prev}
          next={next}
        />
      </div>
    </div>
  )
}