import { NextResponse } from 'next/server'
import { block } from '@/services/block'

export const dynamic = 'force-dynamic' // Important for Next.js 15 route handlers

export async function GET() {
  try {
    const blockHeight = await block.getBlockHeight()
    return NextResponse.json(blockHeight)
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