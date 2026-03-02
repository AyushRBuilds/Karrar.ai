'use client'

import React, { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react'

interface DiffClause {
  title: string
  originalScore: number
  newScore: number
  change: 'improved' | 'worsened' | 'unchanged'
  explanation: string
}

interface CounterTermsRenegotiationProps {
  originalCounterTerms: number
}

export function CounterTermsRenegotiation({ originalCounterTerms }: CounterTermsRenegotiationProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showDiffResults, setShowDiffResults] = useState(false)
  const [diffResults, setDiffResults] = useState<DiffClause[]>([])

  const mockDiffResults: DiffClause[] = [
    {
      title: 'Liability Cap',
      originalScore: 92,
      newScore: 45,
      change: 'improved',
      explanation: 'Other party agreed to cap liability at 12-month fees instead of unlimited.'
    },
    {
      title: 'Non-Compete Scope',
      originalScore: 85,
      newScore: 58,
      change: 'improved',
      explanation: 'Narrowed to 2-year restriction within 100-mile radius, down from 5-year worldwide.'
    },
    {
      title: 'Data Protection',
      originalScore: 71,
      newScore: 71,
      change: 'unchanged',
      explanation: 'No changes made to data protection provisions in revised contract.'
    },
    {
      title: 'Auto-Renewal',
      originalScore: 72,
      newScore: 48,
      change: 'improved',
      explanation: 'Removed automatic renewal; now requires explicit written consent for extension.'
    },
    {
      title: 'Indemnification',
      originalScore: 78,
      newScore: 82,
      change: 'worsened',
      explanation: 'New language added making indemnification more expansive in scope.'
    }
  ]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      handleUpload(file)
    }
  }

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true)

    // Simulate re-analysis
    await new Promise(resolve => setTimeout(resolve, 3000))

    setDiffResults(mockDiffResults)
    setIsAnalyzing(false)
    setShowDiffResults(true)
  }

  if (showDiffResults) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-[#1c1a17]">Changes Summary</h3>

          {diffResults.map((clause, idx) => {
            const changeColor =
              clause.change === 'improved'
                ? { bg: 'bg-[#ecfdf5]', border: 'border-[#10b981]', text: 'text-[#10b981]', icon: '✓' }
                : clause.change === 'worsened'
                  ? { bg: 'bg-[#fee2e2]', border: 'border-[#ef4444]', text: 'text-[#ef4444]', icon: '⚠' }
                  : { bg: 'bg-[#fef3c7]', border: 'border-[#f59e0b]', text: 'text-[#f59e0b]', icon: '⟳' }

            return (
              <div key={idx} className={`border-l-4 rounded-lg p-4 ${changeColor.bg} border ${changeColor.border}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-[#1c1a17]">{clause.title}</h4>
                  <span className={`inline-flex items-center gap-1 text-sm font-semibold ${changeColor.text}`}>
                    <span>{changeColor.icon}</span>
                    {clause.change === 'improved' && 'Risk Reduced'}
                    {clause.change === 'worsened' && 'New Risk Added'}
                    {clause.change === 'unchanged' && 'Still Unresolved'}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-3">
                  <div className="text-sm">
                    <span className="text-[#7a7068]">Previous: </span>
                    <span className="font-bold text-[#ef4444]">{clause.originalScore}/100</span>
                  </div>
                  <span className="text-[#ccc]">→</span>
                  <div className="text-sm">
                    <span className="text-[#7a7068]">Now: </span>
                    <span className={`font-bold ${clause.newScore < clause.originalScore ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {clause.newScore}/100
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#7a7068] italic">{clause.explanation}</p>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 p-4 bg-[#f5f0e8] rounded-lg">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#10b981]">2</p>
            <p className="text-sm text-[#7a7068]">Improvements</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#f59e0b]">2</p>
            <p className="text-sm text-[#7a7068]">Unresolved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ef4444]">1</p>
            <p className="text-sm text-[#7a7068]">New Risk</p>
          </div>
        </div>

        <button
          onClick={() => {
            setShowDiffResults(false)
            setDiffResults([])
          }}
          className="w-full py-3 border border-[#b5924c] text-[#b5924c] font-medium rounded-lg hover:bg-[#e8d9b8] transition"
        >
          Upload Different Revision
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-bold text-[#1c1a17] mb-2">Did the other party respond with a revised contract?</h3>
        <p className="text-[#7a7068] mb-4">
          Upload their revised version for re-analysis — we'll show you what changed and whether the risks were addressed.
        </p>
      </div>

      {isAnalyzing ? (
        <div className="border-2 border-dashed border-[#3b82f6] rounded-xl p-8 text-center bg-[#eff6ff]">
          <div className="w-8 h-8 rounded-full border-3 border-[#3b82f6] border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-[#3b82f6] font-medium">Analyzing revised contract...</p>
          <p className="text-sm text-[#7a7068] mt-2">Comparing against original version</p>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
            isDragging ? 'border-[#b5924c] bg-[#e8d9b8]/20' : 'border-[#e0d9ce] bg-[#f5f0e8] hover:border-[#b5924c]'
          }`}
        >
          <input
            type="file"
            id="revision-upload"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleUpload(file)
            }}
            className="hidden"
          />
          <label htmlFor="revision-upload" className="cursor-pointer block">
            <Upload className="w-10 h-10 text-[#b5924c] mx-auto mb-3" />
            <p className="text-base font-medium text-[#1c1a17] mb-1">Drop revised contract here</p>
            <p className="text-sm text-[#7a7068]">or click to browse</p>
          </label>
        </div>
      )}

      <p className="text-xs text-[#7a7068] text-center">
        We'll analyze the new version and show you exactly which clauses improved, got worse, or remain unresolved.
      </p>
    </div>
  )
}
