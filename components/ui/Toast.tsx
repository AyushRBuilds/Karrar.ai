'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

let toastId = 0
let showToastFn: ((message: string, type: 'success' | 'error' | 'info') => void) | null = null

export function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  const bgColor = {
    success: 'bg-[#27ae60]',
    error: 'bg-[#c0392b]',
    info: 'bg-[#3498db]'
  }

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  }

  return (
    <div className={`${bgColor[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 animate-slide-down`}>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{icon[type]}</span>
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose} className="text-white hover:opacity-80">
        <X size={16} />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    showToastFn = (message: string, type: 'success' | 'error' | 'info') => {
      const id = String(toastId++)
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 3000)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
        />
      ))}
    </div>
  )
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  if (showToastFn) {
    showToastFn(message, type)
  }
}
