'use client'

export function DisclaimerBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0b0d] border-t border-[rgba(196,158,108,0.15)] px-4 py-3 text-center z-40">
      <p className="text-xs text-[#999] flex items-center justify-center gap-2">
        <span>⚖️ AI Legal Intelligence — Not Legal Advice</span>
        <span>·</span>
        <span>Verify critical clauses with a licensed Indian advocate</span>
        <span>·</span>
        <span>Karrar.ai is not a law firm</span>
      </p>
    </div>
  )
}
