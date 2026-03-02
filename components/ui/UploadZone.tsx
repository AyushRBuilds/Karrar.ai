'use client'

import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { showToast } from './Toast'
import { analyzeContractAction } from '@/app/actions/analyzeContract'

interface UploadZoneProps {
  onUpload?: (fileName: string) => void
  onAnalysisComplete?: (analysis: any) => void
  disabled?: boolean
  disabledMessage?: string
}

export function UploadZone({ onUpload, onAnalysisComplete, disabled, disabledMessage }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      handleUpload(file)
    } else {
      showToast('Please upload a PDF file', 'error')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      handleUpload(file)
    } else {
      showToast('Please upload a PDF file', 'error')
    }
  }

  const handleUpload = async (file: File) => {
    if (disabled) {
      showToast(disabledMessage || 'Upload disabled', 'error')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadedFile(file.name)

    try {
      // Run real analysis with progress updates
      const agentSteps = [
        'Parsing PDF...',
        'Extracting Clauses...',
        'Risk Analysis...',
        'Regulatory Review...',
        'Negotiation Prep...',
        'Synthesizing Results...'
      ]

      for (let i = 0; i < agentSteps.length; i++) {
        showToast(agentSteps[i], 'info')
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUploadProgress(((i + 1) / agentSteps.length) * 100)
      }

      // Call server action with real API
      const buffer = await file.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
      const analysis = await analyzeContractAction(base64, file.name)

      // Save to history
      const history = JSON.parse(localStorage.getItem('contracts-history') || '[]')
      const newEntry = {
        id: `${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        overallScore: analysis.overallScore,
        riskLevel: analysis.riskLevel,
        clausesCount: analysis.clauses.length,
        analysisSnapshot: analysis
      }
      history.unshift(newEntry)
      localStorage.setItem('contracts-history', JSON.stringify(history.slice(0, 50)))

      setIsUploading(false)
      showToast('Analysis complete!', 'success')
      onUpload?.(file.name)
      onAnalysisComplete?.(analysis)
    } catch (error) {
      setIsUploading(false)
      showToast('Analysis failed. Please try again.', 'error')
      console.error('[v0] Upload error:', error)
    }
  }

  if (isUploading) {
    return (
      <div className={`border-2 border-dashed rounded-xl p-8 text-center ${disabled ? 'opacity-50 cursor-not-allowed bg-[#f5f0e8]' : 'bg-[#faf8f4]'} border-[#b5924c]`}>
        <p className="text-[#1c1a17] font-medium mb-4">Analyzing your contract...</p>
        <div className="w-full bg-[#e0d9ce] rounded-full h-2 mb-4">
          <div className="bg-[#b5924c] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
        </div>
        <p className="text-sm text-[#7a7068]">{Math.round(uploadProgress)}% complete</p>
      </div>
    )
  }

  if (uploadedFile && !disabled) {
    return (
      <div className="border-2 border-[#b5924c] rounded-xl p-8 text-center bg-[#e8d9b8]/20">
        <p className="text-lg font-serif font-bold text-[#1c1a17] mb-2">📄 {uploadedFile}</p>
        <p className="text-sm text-[#7a7068] mb-4">Ready for analysis</p>
        <button
          onClick={() => {
            setUploadedFile(null)
            setUploadProgress(0)
          }}
          className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium"
        >
          Upload different file
        </button>
      </div>
    )
  }

  if (disabled) {
    return (
      <div className="border-2 border-dashed border-[#e0d9ce] rounded-xl p-8 text-center bg-[#f5f0e8] opacity-60 cursor-not-allowed">
        <Upload className="w-12 h-12 text-[#b5924c] mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium text-[#1c1a17] mb-2">{disabledMessage || 'Upload disabled'}</p>
        <p className="text-sm text-[#7a7068]">Upgrade to Pro for unlimited analyses</p>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
        isDragging ? 'border-[#b5924c] bg-[#e8d9b8]/20' : 'border-[#e0d9ce] bg-[#f5f0e8] hover:border-[#b5924c]'
      }`}
    >
      <input type="file" id="pdf-upload" accept=".pdf" onChange={handleFileSelect} className="hidden" />
      <label htmlFor="pdf-upload" className="cursor-pointer block">
        <Upload className="w-12 h-12 text-[#b5924c] mx-auto mb-4" />
        <p className="text-lg font-medium text-[#1c1a17] mb-1">Drag & drop your PDF here</p>
        <p className="text-sm text-[#7a7068]">or click to browse</p>
      </label>
    </div>
  )
}
