'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000' }}>
        <div style={{ color: '#fff', fontSize: '18px' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'DM Sans, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px', maxWidth: '1200px', margin: '0 auto 80px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#C49E6C' }}>Karrar.ai</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          {user ? (
            <>
              <span style={{ color: '#aaa' }}>Welcome, {user.email}</span>
              <Link href="/protected" style={{ color: '#C49E6C', textDecoration: 'none', fontWeight: 600 }}>
                Dashboard →
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" style={{ color: '#C49E6C', textDecoration: 'none', fontWeight: 600 }}>
                Login
              </Link>
              <Link href="/auth/sign-up" style={{ color: '#C49E6C', textDecoration: 'none', fontWeight: 600 }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
          AI-Powered Contract Intelligence
        </h2>
        <p style={{ fontSize: '18px', color: '#888', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
          Analyze, negotiate, and understand legal contracts in seconds with our autonomous multi-agent system.
        </p>

        {user ? (
          <Link href="/protected" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #C49E6C, #F5D08A)',
            color: '#000',
            padding: '14px 40px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            Go to Dashboard →
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/auth/sign-up" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #C49E6C, #F5D08A)',
              color: '#000',
              padding: '14px 40px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              textDecoration: 'none'
            }}>
              Get Started Free
            </Link>
            <Link href="/auth/login" style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#C49E6C',
              padding: '14px 40px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              border: '1px solid #C49E6C',
              textDecoration: 'none'
            }}>
              Sign In
            </Link>
          </div>
        )}

        <div style={{ marginTop: '120px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '900px', margin: '120px auto 0' }}>
          {[
            { title: 'Risk Analysis', desc: 'Identify critical risks and financial exposures' },
            { title: 'Counter-Terms', desc: 'Auto-generate negotiation counter-proposals' },
            { title: 'Plain Language', desc: 'Translate legal jargon to simple text' }
          ].map((feature, i) => (
            <div key={i} style={{ padding: '24px', background: 'rgba(196,158,108,0.05)', borderRadius: '12px', border: '1px solid rgba(196,158,108,0.1)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#C49E6C' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
