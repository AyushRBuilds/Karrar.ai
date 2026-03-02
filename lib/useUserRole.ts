'use client'

import { useState, useEffect } from 'react'

export type UserRole = 'anonymous' | 'free' | 'pro' | 'admin'

export interface UserProfile {
  email: string
  role: UserRole
  analysesUsed: number
  analysesLimit: number
  createdAt: string
}

const ROLE_LIMITS: Record<UserRole, number> = {
  anonymous: 1,
  free: 3,
  pro: Infinity,
  admin: Infinity
}

export function useUserRole() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for user profile
    const savedUser = localStorage.getItem('user-profile')
    if (savedUser) {
      try {
        const profile = JSON.parse(savedUser)
        setUser(profile)
      } catch {
        initializeDefaultUser()
      }
    } else {
      initializeDefaultUser()
    }
    setLoading(false)
  }, [])

  const initializeDefaultUser = () => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    const storedMonth = localStorage.getItem('analysis-month')

    let analysesUsed = 0
    if (storedMonth === currentMonth) {
      analysesUsed = parseInt(localStorage.getItem(`analyses-used-${currentMonth}`) || '0')
    } else {
      localStorage.setItem('analysis-month', currentMonth)
    }

    // Demo user is Pro, otherwise Anonymous
    const isDemoUser = localStorage.getItem('email') === 'demo@karrar.ai'
    const role: UserRole = isDemoUser ? 'pro' : 'anonymous'

    const profile: UserProfile = {
      email: isDemoUser ? 'demo@karrar.ai' : 'anonymous@karrar.ai',
      role,
      analysesUsed,
      analysesLimit: ROLE_LIMITS[role],
      createdAt: new Date().toISOString()
    }

    setUser(profile)
    localStorage.setItem('user-profile', JSON.stringify(profile))
  }

  const incrementAnalysisCount = () => {
    if (!user) return false

    const currentMonth = new Date().toISOString().slice(0, 7)
    const newCount = user.analysesUsed + 1
    const limit = ROLE_LIMITS[user.role]

    if (limit !== Infinity && newCount > limit) {
      return false // Limit reached
    }

    localStorage.setItem(`analyses-used-${currentMonth}`, String(newCount))

    const updated = { ...user, analysesUsed: newCount }
    setUser(updated)
    localStorage.setItem('user-profile', JSON.stringify(updated))

    return true
  }

  const canAnalyze = (): boolean => {
    if (!user) return false
    const limit = ROLE_LIMITS[user.role]
    return limit === Infinity || user.analysesUsed < limit
  }

  const getRemainingAnalyses = (): number | string => {
    if (!user) return 0
    const limit = ROLE_LIMITS[user.role]
    if (limit === Infinity) return 'Unlimited'
    return Math.max(0, limit - user.analysesUsed)
  }

  const upgradeToRole = (role: UserRole) => {
    if (!user) return
    const updated = { ...user, role, analysesLimit: ROLE_LIMITS[role] }
    setUser(updated)
    localStorage.setItem('user-profile', JSON.stringify(updated))
  }

  return {
    user,
    loading,
    canAnalyze,
    incrementAnalysisCount,
    getRemainingAnalyses,
    upgradeToRole
  }
}
