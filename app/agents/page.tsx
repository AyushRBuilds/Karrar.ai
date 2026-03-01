'use client'

import React, { useState } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const agents = [
  {
    name: 'Contract Auditor',
    icon: '🔍',
    description: 'Analyzes contracts for risks, compliance issues, and unfavorable terms.',
    status: 'active',
    tasksCompleted: 127,
    accuracy: 98
  },
  {
    name: 'Counter-Term Generator',
    icon: '✍️',
    description: 'Generates fair counter-terms and negotiation strategies for Indian law.',
    status: 'active',
    tasksCompleted: 89,
    accuracy: 95
  },
  {
    name: 'Compliance Checker',
    icon: '⚖️',
    description: 'Ensures contracts comply with Indian laws and regulations.',
    status: 'active',
    tasksCompleted: 156,
    accuracy: 99
  },
  {
    name: 'Entity Extractor',
    icon: '🏢',
    description: 'Identifies and extracts key parties, entities, and stakeholders.',
    status: 'active',
    tasksCompleted: 203,
    accuracy: 97
  },
  {
    name: 'Clause Summarizer',
    icon: '📝',
    description: 'Summarizes complex clauses in plain, understandable language.',
    status: 'active',
    tasksCompleted: 178,
    accuracy: 96
  },
  {
    name: 'Risk Scorer',
    icon: '⚠️',
    description: 'Scores clauses on a scale of 1-10 based on financial and legal risk.',
    status: 'active',
    tasksCompleted: 312,
    accuracy: 98
  }
]

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f5f0e8]">
        <AppNavbar />

        <div className="flex">
          <div className="hidden md:block w-64"></div>

          <div className="flex-1 mt-20 md:mt-0 pt-6 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-[#1c1a17] mb-2">Agents</h1>
                <p className="text-lg text-[#7a7068]">Our 6 specialized AI agents working together to analyze your contracts.</p>
              </div>

              {/* Agent Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedAgent(agent)}
                    className="card bg-white p-6 cursor-pointer hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{agent.icon}</div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#27ae60] rounded-full"></span>
                        <span className="text-xs text-[#27ae60] font-medium">Live</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-serif font-bold text-[#1c1a17] mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-[#7a7068] mb-4">
                      {agent.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-[#7a7068]">{agent.tasksCompleted} tasks</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#1c1a17]">{agent.accuracy}% accurate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent Details Modal */}
              {selectedAgent && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="card bg-white max-w-md w-full p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-6xl">{selectedAgent.icon}</div>
                      <button
                        onClick={() => setSelectedAgent(null)}
                        className="text-[#7a7068] hover:text-[#1c1a17]"
                      >
                        ✕
                      </button>
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-[#1c1a17] mb-2">
                      {selectedAgent.name}
                    </h2>
                    <p className="text-[#7a7068] mb-6">
                      {selectedAgent.description}
                    </p>

                    <div className="space-y-4 mb-6 p-4 bg-[#f5f0e8] rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-[#7a7068]">Tasks Completed</span>
                        <span className="font-bold text-[#1c1a17]">{selectedAgent.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7a7068]">Accuracy Rate</span>
                        <span className="font-bold text-[#27ae60]">{selectedAgent.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7a7068]">Status</span>
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#27ae60] rounded-full"></span>
                          <span className="text-[#27ae60] font-medium">Active</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedAgent(null)}
                      className="w-full btn-primary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
