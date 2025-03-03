import { NextResponse } from 'next/server'
import { network } from '@/services/network'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supply = await network.getSupply()
    return NextResponse.json({ supply })
  } catch (error) {
    console.error('Supply fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch supply',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}