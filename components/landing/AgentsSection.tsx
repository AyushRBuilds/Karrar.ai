import React from 'react'

const agents = [
  {
    name: 'Completeness Agent',
    number: 1,
    role: 'Checks missing annexures & schedules',
    description: 'Ensures no critical documents are missing from the contract',
    color: 'bg-blue-50',
    icon: '🔍'
  },
  {
    name: 'Risk & Red Flag Agent',
    number: 2,
    role: 'Scores every clause 0–100',
    description: 'Identifies and quantifies risks in each contract clause',
    color: 'bg-red-50',
    icon: '🛡️'
  },
  {
    name: 'Negotiation Agent',
    number: 3,
    role: 'Generates copy-paste counter-terms',
    description: 'Creates ready-to-use alternative terms for negotiation',
    color: 'bg-green-50',
    icon: '🤝'
  },
  {
    name: 'Draft Consistency Agent',
    number: 4,
    role: 'Catches internal contradictions',
    description: 'Finds conflicts between different sections of the contract',
    color: 'bg-amber-50',
    icon: '📋'
  },
  {
    name: 'Regulatory Adaptation Agent',
    number: 5,
    role: 'Cross-checks Indian Contract Act',
    description: 'Ensures compliance with Indian legal standards',
    color: 'bg-purple-50',
    icon: '🌍'
  },
  {
    name: 'Explanation Agent',
    number: 6,
    role: 'Translates legalese to plain English',
    description: 'Makes complex legal language understandable',
    color: 'bg-indigo-50',
    icon: '💬'
  }
]

export function AgentsSection() {
  return (
    <section id="agents" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1a17] mb-4">
            Meet Your Legal Team
          </h2>
          <p className="text-lg text-[#7a7068]">6 specialized AI agents working in parallel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.number} className={`card p-6 ${agent.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-mono text-[#b5924c] font-bold mb-1">Agent {agent.number}</p>
                  <h3 className="text-lg font-serif font-bold text-[#1c1a17]">{agent.name}</h3>
                </div>
                <span className="text-3xl">{agent.icon}</span>
              </div>
              <p className="text-sm font-medium text-[#b5924c] mb-2">{agent.role}</p>
              <p className="text-sm text-[#7a7068]">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
