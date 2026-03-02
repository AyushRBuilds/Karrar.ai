'use server'

import Anthropic from '@anthropic-ai/sdk'

export interface AnalysisResult {
  fileName: string
  overallScore: number
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  completenessScore: number
  clauses: {
    id: number
    title: string
    type: string
    riskScore: number
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
    agent: string
    negotiable: boolean
    confidence: number
    original: string
    plain: string
    counter: string
    financialExposure: string
    regulatoryNote: string | null
  }[]
  agentOutputs: {
    completeness: { score: number; status: string; missing: string[]; present: string[] }
    risk: { score: number; critical: number; high: number; medium: number; low: number; topRisk: string }
    negotiation: { counterTermsGenerated: number; strategy: string; mostLeverageClause: string }
    consistency: { contradictions: number; issues: string[] }
    regulatory: { complianceScore: number; violations: string[]; jurisdiction: string }
    explanation: { readabilityScore: number; grade: string; summary: string }
  }
}

const systemPrompt = `You are a multi-agent legal contract analysis system for Indian law. Analyze this contract and return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "fileName": "string",
  "overallScore": 7.2,
  "riskLevel": "High",
  "completenessScore": 75,
  "clauses": [{
    "id": 1,
    "title": "Indemnification",
    "type": "Liability",
    "riskScore": 85,
    "riskLevel": "Critical",
    "agent": "Risk Scoring",
    "negotiable": true,
    "confidence": 92,
    "original": "exact clause text here",
    "plain": "plain English explanation",
    "counter": "professionally worded counter-term",
    "financialExposure": "₹50,00,000",
    "regulatoryNote": "Indian Contract Act 1872 Section 140"
  }],
  "agentOutputs": {
    "completeness": { "score": 70, "status": "Incomplete", "missing": ["Force Majeure"], "present": ["Confidentiality"] },
    "risk": { "score": 72, "critical": 1, "high": 2, "medium": 3, "low": 4, "topRisk": "Unlimited liability" },
    "negotiation": { "counterTermsGenerated": 6, "strategy": "Balanced approach", "mostLeverageClause": "Liability caps" },
    "consistency": { "contradictions": 2, "issues": ["Liability contradicts indemnification"] },
    "regulatory": { "complianceScore": 80, "violations": [], "jurisdiction": "Indian" },
    "explanation": { "readabilityScore": 8, "grade": "A", "summary": "Master Service Agreement with moderate risks" }
  }
}
Ground all findings in Indian Contract Act 1872, DPDP Act 2023, and relevant Indian statutes. Analyze for: 1) Liability & Indemnification risks, 2) Non-compete clauses reasonableness, 3) Dispute resolution completeness, 4) DPDP Act 2023 compliance, 5) Termination & renewal clarity. Return ONLY valid JSON.`

export async function analyzeContractAction(fileBase64: string, fileName: string): Promise<AnalysisResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured')
    }

    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: fileBase64
              }
            },
            {
              type: 'text',
              text: 'Please analyze this PDF contract according to the system instructions. Return ONLY valid JSON.'
            }
          ]
        }
      ]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    let analysis: AnalysisResult
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.text.match(/```json\n?([\s\S]*?)\n?```/)
      const jsonStr = jsonMatch ? jsonMatch[1] : content.text
      analysis = JSON.parse(jsonStr)
    } catch (parseError) {
      console.error('[v0] Failed to parse API response:', parseError)
      throw new Error('Invalid JSON response from Claude')
    }

    // Ensure fileName matches uploaded file
    analysis.fileName = fileName

    return analysis
  } catch (error) {
    console.error('[v0] Server action error:', error)
    throw error
  }
}
