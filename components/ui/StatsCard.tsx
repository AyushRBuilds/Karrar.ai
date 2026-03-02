import React from 'react'

interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
  icon?: React.ReactNode
  tint?: 'default' | 'red' | 'amber'
}

export function StatsCard({ title, value, subtitle, icon, tint = 'default' }: StatsCardProps) {
  const tintBg = {
    default: 'bg-[#1a1f3a]',
    red: 'bg-[#2a1a1a]',
    amber: 'bg-[#2a2415]'
  }

  return (
    <div className={`card p-6 ${tintBg[tint]} border border-[#2a3554]`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[#a8b3c7] text-sm font-medium">{title}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-serif font-bold text-[#d4af37]">{value}</p>
      </div>
      {subtitle && <p className="text-xs text-[#7a849e] mt-2">{subtitle}</p>}
    </div>
  )
}
