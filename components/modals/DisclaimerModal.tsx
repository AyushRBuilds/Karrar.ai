'use client'

import React, { useState, useEffect } from 'react'

interface DisclaimerModalProps {
  onDismiss: () => void
}

export function DisclaimerModal({ onDismiss }: DisclaimerModalProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('seen-disclaimer-modal')
    if (hasSeenDisclaimer) {
      setIsDismissed(true)
    }
  }, [])

  if (isDismissed) return null

  const handleConfirm = () => {
    if (dontShowAgain) {
      localStorage.setItem('seen-disclaimer-modal', 'true')
    }
    setIsDismissed(true)
    onDismiss()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0F13] border border-[rgba(196,158,108,0.2)] rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        <h2 className="text-2xl font-serif font-bold text-white mb-4">Before You Read This Report</h2>

        <div className="space-y-4 mb-6 text-[#ccc]">
          <p>
            Karrar.ai provides AI-generated legal intelligence, not legal advice. We are not a law firm and this output does not constitute legal advice under the Advocates Act, 1961.
          </p>
          <p>
            All findings should be verified with a licensed advocate for critical decisions. Analysis is grounded in Indian law but may not reflect the most recent amendments.
          </p>
          <p className="text-sm text-[#999]">
            Use this report for informational purposes only. For binding legal decisions, consult with qualified legal professionals.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6 p-3 bg-[rgba(196,158,108,0.1)] rounded-lg">
          <input
            type="checkbox"
            id="dont-show"
            checked={dontShowAgain}
            onChange={e => setDontShowAgain(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="dont-show" className="text-sm text-[#999] cursor-pointer flex-1">
            Don't show this again
          </label>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-[#C49E6C] to-[#F5D08A] text-black font-bold py-3 rounded-lg hover:from-[#d4ae7c] hover:to-[#ffda94] transition"
        >
          I Understand — Show My Report
        </button>
      </div>
    </div>
  )
}
