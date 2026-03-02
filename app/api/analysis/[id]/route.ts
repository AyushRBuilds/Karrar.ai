import { NextRequest, NextResponse } from 'next/server'
import {
  getAnalysisResult,
  getContract,
  getClauses
} from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const analysisId = params.id

    if (!analysisId) {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      )
    }

    // Get analysis result
    const analysis = getAnalysisResult(analysisId)

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      )
    }

    // Get contract info
    const contract = getContract(analysis.contractId)

    if (!contract) {
      return NextResponse.json(
        { error: 'Contract not found' },
        { status: 404 }
      )
    }

    // Get clauses
    const clauses = getClauses(analysis.contractId)

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        contract,
        clauses
      }
    })
  } catch (error) {
    console.error('Analysis fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analysis' },
      { status: 500 }
    )
  }
}
