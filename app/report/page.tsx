'use client'

import React, { useState, useEffect } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AgentResults } from '@/components/analysis/AgentResults'
import { RiskVisualization } from '@/components/analysis/RiskVisualization'
import { CounterTerms } from '@/components/analysis/CounterTerms'
import { ConsistencyReport } from '@/components/analysis/ConsistencyReport'
import { PlainLanguageSummary } from '@/components/analysis/PlainLanguageSummary'
import { DisclaimerModal } from '@/components/modals/DisclaimerModal'
import { LawyerWarningModal } from '@/components/modals/LawyerWarningModal'
import { DisclaimerBar } from '@/components/DisclaimerBar'
import { exportReportPDF } from '@/lib/pdfExport'
import { Download, Share2, Printer } from 'lucide-react'

interface AgentResult {
  agentName: string
  status: 'processing' | 'completed' | 'failed'
  confidence: number
  findings: string[]
  recommendations?: string[]
  score?: number
}

interface CounterTerm {
  id: string
  original: string
  suggested: string
  severity: 'high' | 'medium' | 'low'
  reasoning: string
  talkingPoints: string[]
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'risks' | 'terms' | 'consistency' | 'summary'>('overview')
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [showLawyerWarning, setShowLawyerWarning] = useState(true)
  const [disclaimerDismissed, setDisclaimerDismissed] = useState(false)

  useEffect(() => {
    // Check if disclaimer has been shown before
    const hasSeenDisclaimer = localStorage.getItem('seen-disclaimer-modal')
    if (hasSeenDisclaimer) {
      setShowDisclaimer(false)
      setDisclaimerDismissed(true)
    }
  }, [])

  // Mock data
  const agentResults: AgentResult[] = [
    {
      agentName: 'Risk Scoring',
      status: 'completed',
      confidence: 94,
      score: 6.8,
      findings: [
        'Identified 3 high-risk clauses',
        'Liability limitations are unfair',
        'Non-compete clause is overly broad',
        'Indemnification is asymmetrical'
      ],
      recommendations: [
        'Negotiate liability caps',
        'Narrow non-compete scope',
        'Balance indemnification clause'
      ]
    },
    {
      agentName: 'Regulatory Adaptation',
      status: 'completed',
      confidence: 89,
      score: 7.2,
      findings: [
        'Contract complies with Indian Contract Act',
        'Missing some GST compliance clauses',
        'Foreign jurisdiction clause may need review'
      ]
    },
    {
      agentName: 'Completeness',
      status: 'completed',
      confidence: 85,
      score: 6.5,
      findings: [
        'Missing force majeure clause',
        'No dispute resolution mechanism',
        'Lacks data protection provisions'
      ],
      recommendations: [
        'Add comprehensive force majeure clause',
        'Include arbitration clause',
        'Add GDPR/data privacy sections'
      ]
    },
    {
      agentName: 'Explanation',
      status: 'completed',
      confidence: 92,
      findings: [
        'Contract is an MSA (Master Service Agreement)',
        '5-year commitment with auto-renewal',
        'Both parties have equal termination rights'
      ]
    },
    {
      agentName: 'Negotiation',
      status: 'completed',
      confidence: 88,
      score: 6.9,
      findings: [
        'Identified 4 negotiable clauses',
        'Counter-terms prepared for review'
      ]
    },
    {
      agentName: 'Draft Consistency',
      status: 'completed',
      confidence: 91,
      score: 7.1,
      findings: [
        'Found 2 conflicting clauses',
        'Inconsistent payment terms definitions'
      ]
    }
  ]

  const counterTerms: CounterTerm[] = [
    {
      id: '1',
      original: 'Neither party shall be liable for any indirect, incidental, or consequential damages.',
      suggested: 'Each party\'s total liability shall be limited to the fees paid in the preceding 12 months, except for breaches of confidentiality or IP infringement.',
      severity: 'high',
      reasoning: 'The current clause eliminates all accountability, which is unfair to the service provider.',
      talkingPoints: [
        'Liability caps are standard in service agreements',
        'Total liability should be proportional to contract value',
        'Confidentiality breaches should always be covered'
      ]
    },
    {
      id: '2',
      original: 'Employee shall not compete with the Company in any market or geography for 5 years.',
      suggested: 'Employee shall not directly solicit Company customers in the same industry for 2 years within 100 miles of existing operations.',
      severity: 'high',
      reasoning: 'The 5-year worldwide non-compete is excessively restrictive and may be unenforceable.',
      talkingPoints: [
        '2-year non-competes are market standard',
        'Geographic/customer limitations are more reasonable',
        'Overly broad provisions are often struck down by courts'
      ]
    },
    {
      id: '3',
      original: 'Confidential information shall be protected for 5 years after disclosure.',
      suggested: 'Trade secrets shall be protected in perpetuity; other confidential information for 3 years post-termination.',
      severity: 'medium',
      reasoning: 'The period is too long for non-sensitive information and may be inconsistent with industry practice.',
      talkingPoints: [
        '3-year standard for most confidential data',
        'Trade secrets inherently deserve longer protection',
        'Proportional approach is more fair'
      ]
    }
  ]

  const inconsistencies = [
    {
      id: '1',
      clause1: 'Liability Limitation',
      clause2: 'Indemnification',
      conflictDescription: 'Liability caps contradict unlimited indemnification obligations',
      severity: 'high' as const,
      resolution: 'Clarify that indemnification is subject to the same liability caps as other obligations.',
      impactScore: 85
    },
    {
      id: '2',
      clause1: 'Termination',
      clause2: 'Payment Terms',
      conflictDescription: 'Unclear when payment obligations end after termination',
      severity: 'medium' as const,
      resolution: 'Add explicit language: "Payment obligations for services rendered prior to termination remain due per original schedule."',
      impactScore: 60
    }
  ]

  const keyObligations = [
    {
      title: 'Payment Obligations',
      description: 'You must pay monthly invoices within 30 days of receipt. Payments are non-refundable unless services were not delivered.',
      severity: 'high' as const
    },
    {
      title: 'Confidentiality',
      description: 'You cannot disclose the other party\'s confidential information to third parties for 3 years after the relationship ends.',
      severity: 'high' as const
    },
    {
      title: 'Data Protection',
      description: 'You must comply with data protection laws when handling personal information shared under this contract.',
      severity: 'high' as const
    },
    {
      title: 'Performance Standards',
      description: 'Services must be delivered according to the specifications outlined in the SOW (Statement of Work).',
      severity: 'medium' as const
    }
  ]

  const redFlags = [
    {
      title: 'Unlimited Liability',
      description: 'The indemnification clause has no caps or limits on liability exposure.',
      explanation: 'This means you could be liable for unlimited damages if something goes wrong, even for small incidents.'
    },
    {
      title: 'Broad Non-Compete',
      description: 'You cannot compete in ANY market or geography for 5 years after employment ends.',
      explanation: 'This is extremely restrictive and may prevent you from working in your industry entirely after the contract ends.'
    },
    {
      title: 'Auto-Renewal Trap',
      description: 'The contract automatically renews unless you provide notice 60 days before expiry.',
      explanation: 'If you forget to notify them in time, you\'re locked in for another year automatically.'
    }
  ]

  return (
    <ProtectedRoute>
      {showDisclaimer && !disclaimerDismissed && (
        <DisclaimerModal
          onDismiss={() => {
            setShowDisclaimer(false)
            setDisclaimerDismissed(true)
            // Trigger lawyer warning check if score >= 7.5
            const overallScore = 6.8
            if (overallScore >= 7.5) {
              setShowLawyerWarning(true)
            }
          }}
        />
      )}

      {showLawyerWarning && disclaimerDismissed && 6.8 >= 7.5 && (
        <LawyerWarningModal
          score={6.8}
          riskLevel="High"
          topClauses={[
            { title: 'Unlimited Liability Indemnification', riskScore: 92, riskLevel: 'Critical' },
            { title: 'Broad 5-Year Non-Compete Clause', riskScore: 85, riskLevel: 'High' }
          ]}
          onConsultLawyer={() => {
            setShowLawyerWarning(false)
            // In real app, navigate to lawyer consultation tab
          }}
          onProceedAnyway={() => {
            setShowLawyerWarning(false)
          }}
        />
      )}

      <div className="min-h-screen bg-[#f5f0e8]">
        <AppNavbar />
        <div className="flex">
          <div className="hidden md:block w-64"></div>
          <div className="flex-1 mt-20 md:mt-0 pt-6 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-[#1c1a17] mb-2">Comprehensive Analysis Report</h1>
                <p className="text-lg text-[#7a7068]">MSA_Company_X.pdf - Generated {new Date().toLocaleDateString()}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => {
                    // Create mock analysis object for PDF export
                    const mockAnalysis = {
                      fileName: 'MSA_Company_X.pdf',
                      overallScore: 6.8,
                      riskLevel: 'High',
                      completenessScore: 75,
                      clauses: [
                        {
                          id: 1,
                          title: 'Unlimited Liability Indemnification',
                          type: 'Liability',
                          riskScore: 92,
                          riskLevel: 'Critical',
                          agent: 'Risk Scoring',
                          negotiable: true,
                          confidence: 94,
                          original:
                            'The indemnifying party shall hold harmless the indemnified party from all claims, damages, losses, and expenses arising from any breach of this agreement, without limitation.',
                          plain: 'You promise to cover all damages if something goes wrong with this contract, with no upper limit on how much you could owe. This could expose you to massive financial risk.',
                          counter:
                            "Each party's total liability shall be limited to the fees paid in the preceding 12 months, except for breaches of confidentiality or IP infringement which remain uncapped.",
                          financialExposure: '₹5,00,00,000+',
                          regulatoryNote: 'Indian Contract Act 1872, Section 140 - Indemnification must be reasonable'
                        }
                      ],
                      agentOutputs: {
                        completeness: { score: 70, status: 'Incomplete', missing: ['Force Majeure'], present: ['Confidentiality'] },
                        risk: { score: 72, critical: 1, high: 2, medium: 3, low: 4, topRisk: 'Unlimited liability' },
                        negotiation: { counterTermsGenerated: 6, strategy: 'Balanced approach', mostLeverageClause: 'Liability caps' },
                        consistency: { contradictions: 2, issues: ['Liability contradicts indemnification'] },
                        regulatory: { complianceScore: 80, violations: [], jurisdiction: 'Indian' },
                        explanation: { readabilityScore: 8, grade: 'A', summary: 'Master Service Agreement with moderate risks' }
                      }
                    }
                    exportReportPDF(mockAnalysis)
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#b5924c] hover:bg-[#a07f3f] text-white rounded-lg font-medium transition"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#b5924c] text-[#b5924c] hover:bg-[#e8d9b8] rounded-lg font-medium transition">
                  <Share2 className="w-4 h-4" />
                  Share Report
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#b5924c] text-[#b5924c] hover:bg-[#e8d9b8] rounded-lg font-medium transition">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 border-b border-[#e0d9ce] pb-4 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'agents', label: 'Agent Results' },
                  { id: 'risks', label: 'Risk Analysis' },
                  { id: 'terms', label: 'Counter-Terms' },
                  { id: 'consistency', label: 'Consistency' },
                  { id: 'summary', label: 'Plain Language' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`whitespace-nowrap pb-2 font-medium transition ${
                      activeTab === tab.id
                        ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                        : 'text-[#7a7068] hover:text-[#1c1a17]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              {activeTab === 'overview' && (
                <div className="card bg-white p-8 space-y-8">
                  <div>
                    <h3 className="font-serif font-bold text-[#1c1a17] text-2xl mb-4">Executive Summary</h3>
                    <p className="text-[#7a7068] leading-relaxed mb-4">
                      This is a Master Service Agreement with a 5-year commitment. The contract contains several high-risk clauses that require negotiation, particularly around liability limitations and non-compete restrictions. Overall risk score is 6.8/10 (High Risk).
                    </p>
                    <p className="text-[#7a7068] leading-relaxed">
                      Key recommendations: (1) Cap unlimited liability, (2) Narrow the non-compete scope, (3) Add force majeure and dispute resolution clauses, (4) Resolve conflicts between liability and indemnification provisions.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="card bg-[#f5f0e8] p-6 border-l-4 border-[#e74c3c]">
                      <p className="text-sm text-[#7a7068] mb-1">Overall Risk</p>
                      <p className="text-4xl font-serif font-bold text-[#e74c3c]">6.8</p>
                      <p className="text-xs text-[#7a7068] mt-2">High Risk - Requires negotiation</p>
                    </div>
                    <div className="card bg-[#f5f0e8] p-6 border-l-4 border-[#f39c12]">
                      <p className="text-sm text-[#7a7068] mb-1">High-Risk Clauses</p>
                      <p className="text-4xl font-serif font-bold text-[#f39c12]">3</p>
                      <p className="text-xs text-[#7a7068] mt-2">Require immediate attention</p>
                    </div>
                    <div className="card bg-[#f5f0e8] p-6 border-l-4 border-[#27ae60]">
                      <p className="text-sm text-[#7a7068] mb-1">Analysis Confidence</p>
                      <p className="text-4xl font-serif font-bold text-[#27ae60]">89%</p>
                      <p className="text-xs text-[#7a7068] mt-2">High confidence analysis</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'agents' && (
                <AgentResults results={agentResults} />
              )}

              {activeTab === 'risks' && (
                <RiskVisualization
                  overallScore={6.8}
                  riskBreakdown={[
                    { type: 'Liability', count: 1, risk: 8.2 },
                    { type: 'Non-Compete', count: 1, risk: 7.8 },
                    { type: 'Indemnification', count: 1, risk: 7.1 },
                    { type: 'Confidentiality', count: 1, risk: 4.2 }
                  ]}
                />
              )}

              {activeTab === 'terms' && (
                <CounterTerms terms={counterTerms} contractName="MSA_Company_X.pdf" />
              )}

              {activeTab === 'consistency' && (
                <ConsistencyReport inconsistencies={inconsistencies} overallScore={78} />
              )}

              {activeTab === 'summary' && (
                <PlainLanguageSummary
                  summary="This Master Service Agreement establishes a 5-year business relationship between you and Company X. You agree to provide services as outlined in the Statement of Work, and they agree to pay you monthly invoices. The contract auto-renews each year unless either party provides 60 days notice. Key obligations include maintaining confidentiality, protecting their data, and meeting performance standards. The main risks involve unlimited liability for claims, an overly broad non-compete that restricts where you can work after the relationship ends, and auto-renewal provisions that lock you in if you miss the notice deadline."
                  keyObligations={keyObligations}
                  redFlags={redFlags}
                  contractName="this MSA"
                />
              )}
            </div>
          </div>
        </div>
        <DisclaimerBar />
      </div>
    </ProtectedRoute>
  )
}
