import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-context'
import { ToastContainer } from '@/components/ui/Toast'

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: 'Karrar.ai - Legal AI for Indian Contracts',
  description: 'India\'s first Multi-Agent Legal AI. Audit contracts, analyze risks & draft counter-terms under Indian Law.',
  generator: 'v0.app',
  icons: {
    icon: '/karrar-logo.png',
    apple: '/karrar-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${dmSans.variable} ${ibmPlexMono.variable} font-sans antialiased bg-[#f5f0e8] dark:bg-[#0f1115] transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <ToastContainer />
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
