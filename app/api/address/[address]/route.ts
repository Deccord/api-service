import { NextResponse } from 'next/server'
import { address } from '@/services/address'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  context: { params: Promise<{ address: string }> }
) {
  try {
    const { address: addressParam } = await context.params
    const info = await address.getAddressInfo(addressParam)
    return NextResponse.json(info)
  } catch (error) {
    console.error('Address info fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch address info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}