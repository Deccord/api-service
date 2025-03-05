import { NextResponse } from 'next/server'
import { blockdetails } from '@/services/blockdetails'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  context: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await context.params
    const block = await blockdetails.getBlock(hash)
    return NextResponse.json(block)
  } catch (error) {
    console.error('Block details fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch block details',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}