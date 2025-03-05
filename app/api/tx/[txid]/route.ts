import { NextResponse } from 'next/server'
import { transaction } from '@/services/transaction'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  context: { params: Promise<{ txid: string }> }
) {
  try {
    const { txid } = await context.params
    const tx = await transaction.getTransaction(txid)
    return NextResponse.json(tx)
  } catch (error) {
    console.error('Transaction fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch transaction',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}