import { NextResponse } from 'next/server'
import { blockchain } from '@/services/blockchain'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const info = await blockchain.getInfo()
    return NextResponse.json(info)
  } catch (error) {
    console.error('Blockchain info fetch error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch blockchain info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}