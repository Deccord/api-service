import { NextResponse } from 'next/server'
import { network } from '@/services/network'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const hashrate = await network.getHashrate()
    return NextResponse.json({ hashrate })
  } catch (error) {
    console.error('Network hashrate fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch network hashrate',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}