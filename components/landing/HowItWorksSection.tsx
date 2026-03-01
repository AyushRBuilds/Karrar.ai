import React from 'react'

const steps = [
  {
    number: 1,
    icon: '📤',
    title: 'Upload',
    description: 'Drag & drop your PDF contract'
  },
  {
    number: 2,
    icon: '⚡',
    title: 'Parallel Analysis',
    description: '6 agents work simultaneously'
  },
  {
    number: 3,
    icon: '📊',
    title: 'Risk Report',
    description: 'Scored clauses ranked by severity'
  },
  {
    number: 4,
    icon: '📝',
    title: 'Counter-Terms',
    description: 'Copy-paste ready alternatives'
  },
  {
    number: 5,
    icon: '✅',
    title: 'Act',
    description: 'Sign, Negotiate, or Consult a Lawyer'
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1a17] mb-4">
            How It Works
          </h2>
          <div className="w-20 h-1 bg-[#b5924c] mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-[#e0d9ce]" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Circle number */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full border-3 border-[#b5924c] bg-white flex items-center justify-center font-serif text-2xl font-bold text-[#b5924c] relative z-10">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <p className="text-4xl mb-3">{step.icon}</p>
                  <h3 className="text-lg font-serif font-bold text-[#1c1a17] mb-2">{step.title}</h3>
                  <p className="text-[#7a7068] text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
