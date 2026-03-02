'use client'

import React from 'react'
import { CheckCircle, Download, Share2, RotateCcw } from 'lucide-react'

interface JourneyCompleteProps {
  contractName: string
  decision: 'sign' | 'counter' | 'lawyer'
  criticalCount: number
  highCount: number
  counterTermsCount?: number
  onStartNew: () => void
}

export function JourneyComplete({
  contractName,
  decision,
  criticalCount,
  highCount,
  counterTermsCount,
  onStartNew
}: JourneyCompleteProps) {
  const getDecisionContent = () => {
    switch (decision) {
      case 'sign':
        return {
          icon: '✓',
          title: 'Contract Acknowledged',
          subtitle: 'Ready to sign with clarity',
          color: 'text-[#10b981]',
          bgColor: 'bg-[#ecfdf5]',
          borderColor: 'border-[#10b981]',
          message: "You've reviewed this contract and are confident in your understanding of all terms and risks.",
          action: 'Download Acknowledgment',
          actionColor: 'bg-[#10b981] hover:bg-[#059669]'
        }
      case 'counter':
        return {
          icon: '↔',
          title: 'Negotiation Package Ready',
          subtitle: 'Counter-terms prepared',
          color: 'text-[#f59e0b]',
          bgColor: 'bg-[#fef3c7]',
          borderColor: 'border-[#f59e0b]',
          message: `You've generated ${counterTermsCount || 6} counter-term suggestions to address the high-risk clauses.`,
          action: 'Copy All & Send',
          actionColor: 'bg-[#f59e0b] hover:bg-[#d97706]'
        }
      case 'lawyer':
        return {
          icon: '⚖',
          title: 'Lawyer Brief Generated',
          subtitle: 'Ready for consultation',
          color: 'text-[#3b82f6]',
          bgColor: 'bg-[#eff6ff]',
          borderColor: 'border-[#3b82f6]',
          message: 'A concise brief with all AI findings has been prepared for your lawyer consultation.',
          action: 'Download Brief',
          actionColor: 'bg-[#3b82f6] hover:bg-[#2563eb]'
        }
    }
  }

  const content = getDecisionContent()

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className={`border-2 rounded-2xl p-12 max-w-2xl w-full ${content.borderColor} ${content.bgColor}`}>
        {/* Icon */}
        <div className={`text-6xl ${content.color} text-center mb-6 font-serif`}>{content.icon}</div>

        {/* Title & Subtitle */}
        <h2 className={`text-3xl font-serif font-bold text-center mb-2 ${content.color}`}>{content.title}</h2>
        <p className="text-center text-[#7a7068] mb-8">{content.subtitle}</p>

        {/* Contract Details */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-[#e0d9ce]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-[#7a7068] mb-1">Contract Analyzed</p>
              <p className="text-lg font-serif font-bold text-[#1c1a17]">{contractName}</p>
            </div>
            <p className="text-sm text-[#7a7068]">{new Date().toLocaleDateString()}</p>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center text-sm font-bold">✓</div>
              <span className="text-sm text-[#1c1a17]">
                <span className="font-medium">Upload</span> - Contract received and parsed
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center text-sm font-bold">✓</div>
              <span className="text-sm text-[#1c1a17]">
                <span className="font-medium">Analysis</span> - AI agents reviewed all clauses
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center text-sm font-bold">✓</div>
              <span className="text-sm text-[#1c1a17]">
                <span className="font-medium">Decision</span> - You've chosen your path
              </span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-[#e0d9ce]">
            <p className="text-sm text-[#7a7068] mb-1">Risks Identified</p>
            <p className="text-2xl font-bold text-[#1c1a17]">
              <span className="text-[#ef4444]">{criticalCount}</span>
              {' '}critical
              {' '}
              <span className="text-[#f59e0b]">+{highCount}</span>
              {' '}high
            </p>
          </div>
          {decision === 'counter' && counterTermsCount && (
            <div className="bg-white rounded-lg p-4 border border-[#e0d9ce]">
              <p className="text-sm text-[#7a7068] mb-1">Counter-Terms Generated</p>
              <p className="text-2xl font-bold text-[#f59e0b]">{counterTermsCount} clauses</p>
            </div>
          )}
          {decision === 'lawyer' && (
            <div className="bg-white rounded-lg p-4 border border-[#e0d9ce]">
              <p className="text-sm text-[#7a7068] mb-1">Brief Status</p>
              <p className="text-2xl font-bold text-[#3b82f6]">Ready to share</p>
            </div>
          )}
          {decision === 'sign' && (
            <div className="bg-white rounded-lg p-4 border border-[#e0d9ce]">
              <p className="text-sm text-[#7a7068] mb-1">Confidence Level</p>
              <p className="text-2xl font-bold text-[#10b981]">High</p>
            </div>
          )}
        </div>

        {/* Message */}
        <p className="text-center text-[#7a7068] mb-8">{content.message}</p>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <button
            className={`w-full py-3 text-white font-semibold rounded-lg transition ${content.actionColor}`}
          >
            {content.action}
          </button>
          <button
            className="w-full py-3 border border-[#b5924c] text-[#b5924c] font-semibold rounded-lg hover:bg-[#e8d9b8] transition"
          >
            <Share2 className="w-4 h-4 inline mr-2" />
            Share Summary
          </button>
        </div>

        {/* Start New */}
        <button
          onClick={onStartNew}
          className="w-full py-3 bg-[#f5f0e8] text-[#1c1a17] font-semibold rounded-lg hover:bg-[#e8d9b8] transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Analysis
        </button>
      </div>
    </div>
  )
}
