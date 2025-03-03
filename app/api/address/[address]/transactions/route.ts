import { NextResponse } from 'next/server'
import { address } from '@/services/address'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
  
  try {
    const transactions = await address.getTransactions(params.address, { limit })
    return NextResponse.json({ transactions })
  } catch (error) {
    console.error('Address transactions fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch address transactions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}