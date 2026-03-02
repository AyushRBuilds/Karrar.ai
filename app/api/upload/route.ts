import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import {
  createContract,
  updateContractStatus,
  addClause,
  createAnalysisResult,
  updateAnalysisResult
} from '@/lib/database'

export const maxDuration = 300 // 5 minutes for PDF processing

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Missing file or userId' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      )
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 50MB' },
        { status: 400 }
      )
    }

    // Create uploads directory
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Save file
    const buffer = await file.arrayBuffer()
    const filename = `${Date.now()}_${file.name}`
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, Buffer.from(buffer))

    // Create contract record
    const contractId = createContract(
      userId,
      file.name,
      `/uploads/${filename}`,
      file.size
    )

    // Initialize analysis result
    const analysisId = createAnalysisResult(contractId)

    // Parse PDF (simulate for now, will be integrated with backend)
    try {
      // In production, this would call the FastAPI backend
      // For now, we'll simulate parsing and clause extraction
      const clauses = await parsePDFAndExtractClauses(filepath)

      // Store clauses in database
      clauses.forEach((clause, index) => {
        addClause(contractId, clause.text, clause.type, index, clause.metadata)
      })

      // Update contract status
      updateContractStatus(contractId, 'completed', clauses.map(c => c.text).join('\n\n'), 1)

      // Mark analysis as ready
      updateAnalysisResult(analysisId, {}, 'completed')
    } catch (parseError) {
      console.error('PDF parsing error:', parseError)
      updateContractStatus(contractId, 'failed')
    }

    return NextResponse.json({
      success: true,
      contractId,
      analysisId,
      filename: file.name,
      message: 'File uploaded successfully. Processing started.'
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// Mock PDF parser - simulates PyMuPDF parsing
async function parsePDFAndExtractClauses(filePath: string): Promise<Array<{
  text: string
  type: string
  metadata?: Record<string, any>
}>> {
  // This is a placeholder. In production, you would:
  // 1. Call the FastAPI backend with the file
  // 2. Use PyMuPDF to extract text and structure
  // 3. Use NLP to segment clauses
  // 4. Classify clause types

  // For now, return mock clauses
  const mockClauses = [
    {
      text: 'Confidentiality: The receiving party agrees to keep all proprietary information confidential for a period of 5 years after disclosure.',
      type: 'Confidentiality',
      metadata: { severity: 'high', length: 'medium' }
    },
    {
      text: 'Liability: Neither party shall be liable for any indirect, incidental, or consequential damages arising from this agreement.',
      type: 'Liability',
      metadata: { severity: 'medium', length: 'medium' }
    },
    {
      text: 'Termination: Either party may terminate this agreement with 30 days written notice.',
      type: 'Termination',
      metadata: { severity: 'high', length: 'short' }
    },
    {
      text: 'Intellectual Property: All intellectual property created during the term of this agreement shall belong to the Company.',
      type: 'Intellectual Property',
      metadata: { severity: 'high', length: 'medium' }
    },
    {
      text: 'Indemnification: Each party shall indemnify and hold harmless the other party from any claims arising from breach of this agreement.',
      type: 'Indemnification',
      metadata: { severity: 'high', length: 'medium' }
    }
  ]

  return mockClauses
}
