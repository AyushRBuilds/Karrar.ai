'use client'

import React, { useState } from 'react'
import { AlertTriangle, Upload } from 'lucide-react'

interface MissingDocumentsUploadProps {
  missingDocuments: string[]
  onUploadComplete?: (documents: File[]) => void
}

export function MissingDocumentsUpload({ missingDocuments, onUploadComplete }: MissingDocumentsUploadProps) {
  const [uploadingDocs, setUploadingDocs] = useState<Record<string, boolean>>({})
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({})
  const [isReanalyzing, setIsReanalyzing] = useState(false)

  if (missingDocuments.length === 0) return null

  const handleUploadDoc = async (docName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingDocs(prev => ({ ...prev, [docName]: true }))

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))

    setUploadingDocs(prev => ({ ...prev, [docName]: false }))
    setUploadedDocs(prev => ({ ...prev, [docName]: true }))

    // Check if all documents are uploaded
    const allUploaded = missingDocuments.every(doc => uploadedDocs[doc] || doc === docName)

    if (allUploaded) {
      // Trigger re-analysis
      setIsReanalyzing(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsReanalyzing(false)
      onUploadComplete?.([file])
    }
  }

  return (
    <div className="mb-8 p-6 border-2 border-[#f59e0b] border-l-4 rounded-lg bg-[#fef3c7]/10">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-serif font-bold text-[#1c1a17] mb-1">Missing Documents Detected — Analysis May Be Incomplete</h3>
          <p className="text-sm text-[#7a7068]">Upload the following documents to improve analysis accuracy:</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {missingDocuments.map((docName, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 transition ${
              uploadedDocs[docName]
                ? 'border-[#10b981] bg-[#ecfdf5]'
                : uploadingDocs[docName]
                  ? 'border-[#3b82f6] bg-[#eff6ff]'
                  : 'border-[#e0d9ce] bg-white hover:border-[#b5924c]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">
                  {uploadedDocs[docName] ? '✓' : uploadingDocs[docName] ? '⏳' : '📄'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1c1a17] truncate">{docName}</p>
                  {uploadedDocs[docName] && <p className="text-xs text-[#10b981]">Successfully uploaded</p>}
                  {uploadingDocs[docName] && <p className="text-xs text-[#3b82f6]">Uploading...</p>}
                </div>
              </div>

              {!uploadedDocs[docName] && (
                <label className="ml-4">
                  <input
                    type="file"
                    onChange={(e) => handleUploadDoc(docName, e)}
                    className="hidden"
                    disabled={uploadingDocs[docName]}
                  />
                  <button
                    onClick={(e) => {
                      const label = e.currentTarget.parentElement as HTMLLabelElement
                      label.querySelector('input')?.click()
                    }}
                    disabled={uploadingDocs[docName]}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#b5924c] hover:bg-[#e8d9b8] rounded-lg transition disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Re-analysis Status */}
      {isReanalyzing && (
        <div className="p-4 bg-[#3b82f6]/10 border border-[#3b82f6] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-[#3b82f6] border-t-transparent animate-spin"></div>
            <span className="text-sm text-[#3b82f6] font-medium">Re-analyzing with uploaded documents...</span>
          </div>
        </div>
      )}

      {missingDocuments.every(doc => uploadedDocs[doc]) && !isReanalyzing && (
        <div className="p-4 bg-[#10b981]/10 border border-[#10b981] rounded-lg">
          <p className="text-sm text-[#10b981] font-medium">All documents uploaded. Analysis is now complete.</p>
        </div>
      )}
    </div>
  )
}
