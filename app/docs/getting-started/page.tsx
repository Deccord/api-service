"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { config } from '@/config'
import { DocsPager } from '@/components/DocsPager'
import { usePathname } from 'next/navigation'
import { navigation } from '@/config/nav'
import { getPagerForPath } from '@/lib/docs'

export default function GettingStartedPage() {
  const pathname = usePathname()
  const { prev, next } = getPagerForPath(navigation, pathname)

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
        <p className="text-gray-600 mb-8">
          Learn how to use the {config.blockchain.name} Blockchain API to access public blockchain data.
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Making API Requests</CardTitle>
              <CardDescription>How to interact with the API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                All API endpoints are accessible via HTTP requests. The API accepts GET requests 
                and returns responses in JSON format.
              </p>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono">
                  Base URL: {config.web.apiUrl}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example Request</CardTitle>
              <CardDescription>Get current block height</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono">
                  curl {config.web.apiUrl}/api/blocks
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Response format:
              </p>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono">
                  {`{
  "height": 123456
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Guidelines</CardTitle>
              <CardDescription>Important information for usage</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All endpoints return JSON responses</li>
                <li>• No authentication required for public endpoints</li>
                <li>• Rate limiting may apply to prevent abuse</li>
                <li>• Keep requests cached when possible</li>
              </ul>
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