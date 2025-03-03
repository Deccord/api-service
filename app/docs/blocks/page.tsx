"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CodeBlock from '@/components/CodeBlock'
import { config } from '@/config'
import { DocsPager } from '@/components/DocsPager'

export default function BlocksApiPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const curlRequest = `curl ${config.web.apiUrl}/api/blocks`
  const fetchRequest = `fetch("${config.web.apiUrl}/api/blocks")
  .then(response => response.json())
  .then(data => console.log(data));`
  
  const exampleResponse = `{
  "height": 123456
}`

  const handleTestApi = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${config.web.apiUrl}/api/blocks`)
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
        <h1 className="text-3xl font-bold mb-4">{config.blockchain.name} Blocks API</h1>
        <p className="text-gray-600 mb-8">
          Endpoints for retrieving block information from the {config.blockchain.name} blockchain
        </p>

        <div className="space-y-8">
          {/* API Reference Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get Block Height</CardTitle>
              <CardDescription>
                Retrieve the current block height from the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    GET /api/blocks
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

          {/* Try It Card */}
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
          prev={{
            href: "/docs/getting-started",
            title: "Getting Started"
          }}
        />
      </div>
    </div>
  )
}