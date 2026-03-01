'use client'

import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { showToast } from './Toast'

interface UploadZoneProps {
  onUpload?: (fileName: string) => void
}

export function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      simulateUpload(file.name)
    } else {
      showToast('Please upload a PDF file', 'error')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      simulateUpload(file.name)
    } else {
      showToast('Please upload a PDF file', 'error')
    }
  }

  const simulateUpload = async (fileName: string) => {
    setIsUploading(true)
    setUploadProgress(0)
    setUploadedFile(fileName)

    // Simulate 3-step upload process
    const steps = ['Parsing PDF...', 'Running 6 agents...', 'Synthesizing results...']
    
    for (let i = 0; i < steps.length; i++) {
      showToast(steps[i], 'info')
      await new Promise(resolve => setTimeout(resolve, 1000))
      setUploadProgress(((i + 1) / steps.length) * 100)
    }

    setIsUploading(false)
    showToast('Analysis complete! View in Dashboard →', 'success')
    onUpload?.(fileName)
  }

  if (isUploading) {
    return (
      <div className="border-2 border-dashed border-[#b5924c] rounded-xl p-8 text-center bg-[#faf8f4]">
        <p className="text-[#1c1a17] font-medium mb-4">Analyzing your contract...</p>
        <div className="w-full bg-[#e0d9ce] rounded-full h-2 mb-4">
          <div
            className="bg-[#b5924c] h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-[#7a7068]">{Math.round(uploadProgress)}% complete</p>
      </div>
    )
  }

  if (uploadedFile) {
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

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
        isDragging
          ? 'border-[#b5924c] bg-[#e8d9b8]/20'
          : 'border-[#e0d9ce] bg-[#f5f0e8] hover:border-[#b5924c]'
      }`}
    >
      <input
        type="file"
        id="pdf-upload"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
      <label htmlFor="pdf-upload" className="cursor-pointer block">
        <Upload className="w-12 h-12 text-[#b5924c] mx-auto mb-4" />
        <p className="text-lg font-medium text-[#1c1a17] mb-1">
          Drag & drop your PDF here
        </p>
        <p className="text-sm text-[#7a7068]">or click to browse</p>
      </label>
    </div>
  )
}
