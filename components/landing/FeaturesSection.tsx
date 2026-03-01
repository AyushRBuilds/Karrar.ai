import React from 'react'

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1a17]">
            Powerful Features
          </h2>
        </div>

        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-serif font-bold text-[#1c1a17] mb-4">
              Quantified Risk Scores
            </h3>
            <p className="text-lg text-[#7a7068] mb-6">
              Every clause is scored from 0-100 based on risk level. Understand exactly which parts of your contract pose the highest risk.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#b5924c] font-bold">✓</span>
                <span className="text-[#7a7068]">Color-coded risk levels (red, amber, green)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#b5924c] font-bold">✓</span>
                <span className="text-[#7a7068]">Detailed explanation for every risk score</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#b5924c] font-bold">✓</span>
                <span className="text-[#7a7068]">Benchmarked against Indian legal standards</span>
              </li>
            </ul>
          </div>
          <div className="card p-8 bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e0d9ce]">
                <span className="font-mono text-[#1c1a17]">Indemnification Clause</span>
                <span className="bg-[#c0392b] text-white px-3 py-1 rounded-full text-sm font-mono">8.4</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#e0d9ce]">
                <span className="font-mono text-[#1c1a17]">Confidentiality Terms</span>
                <span className="bg-[#e67e22] text-white px-3 py-1 rounded-full text-sm font-mono">7.1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#1c1a17]">Standard Clause</span>
                <span className="bg-[#27ae60] text-white px-3 py-1 rounded-full text-sm font-mono">2.3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="card p-8 bg-white order-2 md:order-1">
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-[#1c1a17]">Generated Counter-Terms</h4>
              <p className="text-sm text-[#7a7068]">Ready to use alternatives for risky clauses</p>
              <div className="bg-[#f5f0e8] p-4 rounded-lg text-sm font-mono text-[#1c1a17]">
                <p className="font-bold mb-2">Suggestion:</p>
                <p>"The indemnifying party shall limit liability to direct damages only..."</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl font-serif font-bold text-[#1c1a17] mb-4">
              Ready-to-Send Counter-Terms
            </h3>
            <p className="text-lg text-[#7a7068] mb-6">
              Stop spending hours drafting counter-proposals. Copy-paste ready terms for negotiation.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#b5924c] font-bold">✓</span>
                <span className="text-[#7a7068]">AI-powered alternative language</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#b5924c] font-bold">✓</span>
                <span className="text-[#7a7068]">Compliant with Indian law</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#b5924c] font-bold">✓</span>
                <span className="text-[#7a7068]">Multiple options for each risk</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
