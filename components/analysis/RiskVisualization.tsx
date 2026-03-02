'use client'

import React from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface RiskBreakdown {
  type: string
  count: number
  risk: number
}

interface RiskVisualizationProps {
  overallScore: number
  riskBreakdown: RiskBreakdown[]
  comparisonScore?: number
}

export function RiskVisualization({
  overallScore,
  riskBreakdown,
  comparisonScore = 5.2
}: RiskVisualizationProps) {
  // Prepare data for pie chart
  const riskDistribution = [
    { name: 'Critical (8-10)', value: riskBreakdown.filter(r => r.risk >= 8).length, color: '#e74c3c' },
    { name: 'High (6-7.9)', value: riskBreakdown.filter(r => r.risk >= 6 && r.risk < 8).length, color: '#f39c12' },
    { name: 'Medium (3-5.9)', value: riskBreakdown.filter(r => r.risk >= 3 && r.risk < 6).length, color: '#f1c40f' },
    { name: 'Low (0-2.9)', value: riskBreakdown.filter(r => r.risk < 3).length, color: '#27ae60' }
  ]

  const riskData = riskBreakdown.map(item => ({
    name: item.type.split(' ').slice(0, 2).join(' '),
    risk: item.risk,
    count: item.count
  }))

  const getRiskColor = (score: number) => {
    if (score >= 8) return '#e74c3c'
    if (score >= 6) return '#f39c12'
    if (score >= 3) return '#f1c40f'
    return '#27ae60'
  }

  const getRiskLabel = (score: number) => {
    if (score >= 8) return 'Critical'
    if (score >= 6) return 'High'
    if (score >= 3) return 'Medium'
    return 'Low'
  }

  return (
    <div className="space-y-6">
      {/* Overall Risk Gauge */}
      <div className="card bg-white p-6">
        <h3 className="font-serif font-bold text-[#1c1a17] mb-6">Overall Risk Assessment</h3>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Gauge */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Circular gauge background */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#e0d9ce" strokeWidth="20" />

                {/* Risk circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={getRiskColor(overallScore)}
                  strokeWidth="20"
                  strokeDasharray={`${(overallScore / 10) * 565.2} 565.2`}
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 100px' }}
                />

                {/* Center text */}
                <text
                  x="100"
                  y="95"
                  textAnchor="middle"
                  className="text-4xl font-serif font-bold fill-[#1c1a17]"
                >
                  {overallScore.toFixed(1)}
                </text>
                <text x="100" y="115" textAnchor="middle" className="text-sm fill-[#7a7068]">
                  {getRiskLabel(overallScore)}
                </text>
              </svg>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-[#7a7068] mb-2">Your Score</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-serif font-bold text-[#1c1a17]">{overallScore.toFixed(1)}</p>
                <p className="text-sm text-[#7a7068]">out of 10</p>
              </div>
            </div>

            <div className="bg-[#f5f0e8] p-4 rounded-lg">
              <p className="text-sm font-medium text-[#1c1a17] mb-2">Risk Level: {getRiskLabel(overallScore)}</p>
              <p className="text-sm text-[#7a7068]">
                {overallScore >= 8 && 'This contract has critical risks that require immediate attention and negotiation.'}
                {overallScore >= 6 && overallScore < 8 && 'This contract has several high-risk clauses that should be reviewed and negotiated.'}
                {overallScore >= 3 && overallScore < 6 && 'This contract has moderate risks. Consider negotiating key terms.'}
                {overallScore < 3 && 'This contract is relatively safe. Standard terms with minimal risk.'}
              </p>
            </div>

            <div className="text-sm">
              <p className="text-[#7a7068] mb-1">Industry Average</p>
              <p className="font-medium text-[#1c1a17] mb-2">{comparisonScore.toFixed(1)}</p>
              <p className={`text-xs font-medium ${overallScore > comparisonScore ? 'text-[#e74c3c]' : 'text-[#27ae60]'}`}>
                {overallScore > comparisonScore
                  ? `${(overallScore - comparisonScore).toFixed(1)} points higher than average`
                  : `${(comparisonScore - overallScore).toFixed(1)} points lower than average`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="card bg-white p-6">
        <h3 className="font-serif font-bold text-[#1c1a17] mb-6">Risk Distribution</h3>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Pie Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: `1px solid #e0d9ce` }}
                  formatter={(value) => `${value} clause${value !== 1 ? 's' : ''}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-[#7a7068]">
                  {item.name}: <span className="font-medium text-[#1c1a17]">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk by Clause Type */}
      <div className="card bg-white p-6">
        <h3 className="font-serif font-bold text-[#1c1a17] mb-6">Risk by Clause Type</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskData}>
            <XAxis
              dataKey="name"
              stroke="#7a7068"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#7a7068" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0d9ce' }}
              formatter={(value) => [value.toFixed(1), 'Risk Score']}
            />
            <Bar dataKey="risk" fill="#b5924c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
