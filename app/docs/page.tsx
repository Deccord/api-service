import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { config } from '@/config'
import { DocsPager } from '@/components/DocsPager'

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{config.web.title}</h1>
          <p className="text-lg text-muted-foreground">
            {config.web.description}
          </p>
        </div>

        <div className="space-y-6">
          {/* API Base URL Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">API Base URL</CardTitle>
              <CardDescription>Use this base URL for all API endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono">
                  {config.web.apiUrl}
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                All API requests should be made to this base URL. The API accepts JSON-encoded request bodies 
                and returns JSON-encoded responses.
              </p>
            </CardContent>
          </Card>

          {/* About Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">About {config.blockchain.name}</CardTitle>
              <CardDescription>Overview of the blockchain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Blockchain Details</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">
                      <span className="font-medium">Name:</span> {config.blockchain.name}
                    </li>
                    <li className="text-sm text-muted-foreground">
                      <span className="font-medium">Symbol:</span> {config.blockchain.symbol}
                    </li>
                    <li className="text-sm text-muted-foreground">
                      <span className="font-medium">Decimals:</span> {config.blockchain.decimals}
                    </li>
                    <li className="text-sm text-muted-foreground">
                      <span className="font-medium">Unit Name:</span> {config.blockchain.unitName}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">API Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>Query block information</li>
                    <li>Get network statistics</li>
                    <li>Public blockchain data access</li>
                    <li>Real-time updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        <DocsPager
          next={{
            href: "/docs/getting-started",
            title: "Getting Started"
          }}
        />
      </div>
    </div>
  )
}