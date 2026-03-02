'use client'

import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface LawyerWarningModalProps {
  score: number
  riskLevel: string
  topClauses: { title: string; riskScore: number; riskLevel: string }[]
  onConsultLawyer: () => void
  onProceedAnyway: () => void
}

export function LawyerWarningModal({ score, riskLevel, topClauses, onConsultLawyer, onProceedAnyway }: LawyerWarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0F13] border border-[#ef4444]/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        <div className="flex items-start gap-4 mb-6">
          <AlertTriangle className="w-8 h-8 text-[#ef4444] flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">High Risk Contract Detected</h2>
            <p className="text-[#999] mt-1">This contract scored {score.toFixed(1)}/10 — we strongly recommend consulting a lawyer before signing.</p>
          </div>
        </div>

        {/* Score Display */}
        <div className="mb-6 p-4 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#ccc]">Overall Risk Score</span>
            <span className="text-3xl font-bold text-[#ef4444]">{score.toFixed(1)}/10</span>
          </div>
          <div className="text-sm text-[#999]">Risk Level: {riskLevel}</div>
        </div>

        {/* Top Clauses Preview */}
        {topClauses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">Top Flagged Clauses:</h3>
            <div className="space-y-2">
              {topClauses.slice(0, 2).map((clause, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.1)] rounded">
                  <div className="text-sm font-semibold text-[#ef4444]">•</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{clause.title}</p>
                    <p className="text-xs text-[#999]">Risk: {clause.riskScore}/100 ({clause.riskLevel})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[rgba(196,158,108,0.05)] border border-[rgba(196,158,108,0.15)] rounded-lg p-4 mb-6">
          <p className="text-sm text-[#ccc]">
            You can still view the full report and use AI-generated counter-terms, but we recommend consulting a lawyer for critical decisions.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConsultLawyer}
            className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-3 rounded-lg transition"
          >
            Consult a Lawyer First
          </button>
          <button
            onClick={onProceedAnyway}
            className="flex-1 bg-[rgba(196,158,108,0.2)] hover:bg-[rgba(196,158,108,0.3)] text-[#C49E6C] font-semibold py-3 rounded-lg transition"
          >
            View Full Report Anyway →
          </button>
        </div>
      </div>
    </div>
  )
}
