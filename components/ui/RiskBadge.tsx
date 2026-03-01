import React from 'react'
import { Shield } from 'lucide-react'

interface RiskBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function RiskBadge({ score, size = 'md' }: RiskBadgeProps) {
  const getRiskColor = (score: number) => {
    if (score >= 8) return 'bg-[#c0392b] text-white'
    if (score >= 6) return 'bg-[#e67e22] text-white'
    if (score >= 3) return 'bg-[#7f8c8d] text-white'
    return 'bg-[#27ae60] text-white'
  }
  
  const getRiskIcon = (score: number) => {
    if (score >= 8) return '🔴'
    if (score >= 6) return '🟡'
    if (score >= 3) return '⚪'
    return '🟢'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <div className={`${getRiskColor(score)} rounded-full font-mono font-bold flex items-center gap-1 w-fit ${sizeClasses[size]}`}>
      <span>{getRiskIcon(score)}</span>
      <span>{score.toFixed(1)}</span>
    </div>
  )
}
