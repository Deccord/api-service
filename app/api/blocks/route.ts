import { NextResponse } from 'next/server'
import { block } from '@/services/block'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const height = await block.getHeight()
    return NextResponse.json({ height })
  } catch (error) {
    console.error('Block height fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch block height',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}