import { NextResponse } from 'next/server'
import { block } from '@/services/block'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { height: string } }
) {
  const resolvedParams = await params
  const height = parseInt(resolvedParams.height, 10)
  
  if (isNaN(height)) {
    return NextResponse.json(
      { error: 'Invalid block height' },
      { status: 400 }
    )
  }

  try {
    const hash = await block.getBlockHash(height)
    return NextResponse.json({ hash })
  } catch (error) {
    console.error('Block hash fetch error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch block hash',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}