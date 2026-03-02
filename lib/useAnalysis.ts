'use client'

import { useState } from 'react'
import { AnalysisResult, analyzeContractPDF } from './api'

export interface StoredAnalysis {
  id: string
  fileName: string
  uploadDate: string
  overallScore: number
  riskLevel: string
  clausesCount: number
  analysisSnapshot: AnalysisResult
}

export function useAnalysis() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // Simulate progress with agent steps
      const agentSteps = ['Parsing PDF...', 'Extracting Clauses...', 'Running Risk Analysis...', 'Regulatory Review...', 'Negotiation Prep...', 'Synthesizing Results...']

      for (let i = 0; i < agentSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        setAnalysisProgress(((i + 1) / agentSteps.length) * 100)
      }

      // Call real API
      const analysis = await analyzeContractPDF(file)
      setCurrentAnalysis(analysis)

      // Save to history
      saveToHistory(analysis)

      return analysis
    } catch (error) {
      console.error('[v0] Analysis failed:', error)
      throw error
    } finally {
      setIsAnalyzing(false)
    }
  }

  const saveToHistory = (analysis: AnalysisResult) => {
    try {
      const existing = JSON.parse(localStorage.getItem('contracts-history') || '[]') as StoredAnalysis[]
      const newEntry: StoredAnalysis = {
        id: `${Date.now()}`,
        fileName: analysis.fileName,
        uploadDate: new Date().toISOString(),
        overallScore: analysis.overallScore,
        riskLevel: analysis.riskLevel,
        clausesCount: analysis.clauses.length,
        analysisSnapshot: analysis
      }
      existing.unshift(newEntry)
      // Keep last 50 analyses
      localStorage.setItem('contracts-history', JSON.stringify(existing.slice(0, 50)))
    } catch (error) {
      console.error('[v0] Failed to save to history:', error)
    }
  }

  const getHistory = (): StoredAnalysis[] => {
    try {
      return JSON.parse(localStorage.getItem('contracts-history') || '[]')
    } catch {
      return []
    }
  }

  const deleteFromHistory = (id: string) => {
    try {
      const existing = JSON.parse(localStorage.getItem('contracts-history') || '[]') as StoredAnalysis[]
      const filtered = existing.filter(item => item.id !== id)
      localStorage.setItem('contracts-history', JSON.stringify(filtered))
    } catch (error) {
      console.error('[v0] Failed to delete from history:', error)
    }
  }

  const loadAnalysis = (id: string) => {
    const history = getHistory()
    const item = history.find(h => h.id === id)
    if (item) {
      setCurrentAnalysis(item.analysisSnapshot)
      return item.analysisSnapshot
    }
    return null
  }

  return {
    currentAnalysis,
    setCurrentAnalysis,
    isAnalyzing,
    analysisProgress,
    analyzeFile,
    getHistory,
    deleteFromHistory,
    loadAnalysis
  }
}
