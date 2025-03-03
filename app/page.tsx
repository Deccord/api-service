import Link from 'next/link'
import { config } from '@/config'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code2, Database, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">{config.blockchain.name} API</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Simple and fast REST API service for accessing {config.blockchain.name} blockchain data.
          Built for developers, powered by {config.blockchain.symbol}.
        </p>
        <div className="mt-8">
          <Link 
            href="/docs" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View Documentation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <Card>
          <CardContent className="pt-6">
            <Globe className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Public Access</h2>
            <p className="text-muted-foreground">
              Access blockchain data through simple HTTP requests. No authentication required.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Code2 className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">RESTful API</h2>
            <p className="text-muted-foreground">
              Simple and intuitive REST endpoints. JSON responses for easy integration.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Database className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Real-time Data</h2>
            <p className="text-muted-foreground">
              Get the latest blockchain data with real-time updates and responses.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to start?</h2>
        <p className="text-muted-foreground mb-6">
          Get started with our comprehensive API documentation.
        </p>
        <Link 
          href="/docs/getting-started" 
          className="text-primary hover:text-primary/90 font-medium inline-flex items-center gap-2"
        >
          Read Getting Started Guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}