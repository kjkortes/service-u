'use client'

import { useEffect, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { useStore } from '@/_store'
import { useIsMobile } from '@/_hooks/use-mobile'
import { LayoutProvider } from '@/_context/LayoutContext'
import FoliageBackground from '@/_components/FoliageBackground'
import BottomNav from '@/_components/BottomNav'
import TopNav from '@/_components/TopNav'
import Toast from '@/_components/Toast'

function LoadingFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: '#F7F6F0' }}
    >
      <div
        className="animate-pulse"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#0F3D2E',
          opacity: 0.3,
        }}
      />
    </div>
  )
}

function ClientShellInner({ children }: { children: React.ReactNode }) {
  const { showFoliage } = useStore()
  const isMobile = useIsMobile()
  const pathname = usePathname()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {})
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
    }
  }, [])

  const showNav = pathname === '/' || pathname.startsWith('/listings/')

  return (
    <div className="relative" style={{ height: '100vh', overflow: 'hidden' }}>
      {showFoliage && <FoliageBackground />}

      <main
        className="relative z-[1]"
        style={{
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>

      <Toast />

      {!isMobile && <TopNav />}
      {showNav && isMobile && <BottomNav />}
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ClientShellInner>{children}</ClientShellInner>
    </LayoutProvider>
  )
}
