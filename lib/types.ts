// Database and API types for contract analysis system

export interface User {
  id: string
  email: string
  tier: 'anonymous' | 'free' | 'pro' | 'admin'
  createdAt: Date
  analysisCount: number
}

export interface Contract {
  id: string
  userId: string
  filename: string
  filePath: string
  uploadDate: Date
  status: 'processing' | 'completed' | 'failed'
  fileSize: number
  pageCount?: number
  rawText?: string
}

export interface Clause {
  id: string
  contractId: string
  clauseText: string
  clauseType: string
  position: number // Order in document
  parsedAt: Date
  metadata?: Record<string, any>
}

export interface AnalysisResult {
  id: string
  contractId: string
  createdAt: Date
  status: 'processing' | 'completed' | 'failed'
  
  // Agent results
  riskScore: number // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskDetails?: {
    flaggedClauses: string[]
    criticalIssues: string[]
    confidence: number
  }
  
  regulatoryAdaptation?: {
    jurisdictions: string[]
    adaptations: string[]
    confidence: number
  }
  
  completeness?: {
    missingClauses: string[]
    score: number
    recommendations: string[]
  }
  
  explanation?: {
    plainLanguageSummary: string
    keyObligations: string[]
    redFlags: string[]
  }
  
  negotiation?: {
    counterTerms: string[]
    talkingPoints: string[]
    confidence: number
  }
  
  consistency?: {
    issues: Array<{
      clause1: string
      clause2: string
      conflictDescription: string
      severity: 'low' | 'medium' | 'high'
    }>
    overallScore: number
  }
  
  synthesis?: {
    executiveSummary: string
    overallRecommendation: string
    nextSteps: string[]
  }
}

export interface ReportData {
  contractId: string
  analysis: AnalysisResult
  contract: Contract
  clauses: Clause[]
  generatedAt: Date
  disclaimer: string
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
