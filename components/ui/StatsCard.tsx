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
    default: 'bg-white',
    red: 'bg-red-50',
    amber: 'bg-amber-50'
  }

  return (
    <div className={`card p-6 ${tintBg[tint]}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[#7a7068] text-sm font-medium">{title}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-serif font-bold text-[#1c1a17]">{value}</p>
      </div>
      {subtitle && <p className="text-xs text-[#7a7068] mt-2">{subtitle}</p>}
    </div>
  )
}
