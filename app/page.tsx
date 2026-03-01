'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center flex-col gap-8 px-4">
      <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1c1a17] text-center">
        Karrar.ai
      </h1>
      <p className="text-xl text-[#7a7068] max-w-2xl text-center">
        India's First Multi-Agent Legal AI
      </p>
      <p className="text-lg text-[#b5924c] font-semibold text-center">
        Understand. Negotiate. Sign.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a href="/login" className="px-8 py-4 bg-[#1c1a17] text-white rounded-lg hover:bg-[#2d2a24] transition font-medium">
          Upload a Contract — It's Free
        </a>
        <a href="/about" className="px-8 py-4 border-2 border-[#1c1a17] text-[#1c1a17] rounded-lg hover:bg-[#1c1a17] hover:text-white transition font-medium">
          Learn More
        </a>
      </div>

      <div className="mt-12 text-center text-sm text-[#7a7068]">
        <p>🔒 End-to-End Encrypted</p>
        <p>🇮🇳 Indian Law Grounded</p>
        <p>⚡ 90-Second Analysis</p>
      </div>
    </div>
  )
}
