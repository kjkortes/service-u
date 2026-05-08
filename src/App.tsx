import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useStore } from './store'
import FoliageBackground from './components/FoliageBackground'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ListingsPage = lazy(() => import('./pages/ListingsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))

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

export default function App() {
  const { showFoliage } = useStore()
  const location = useLocation()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          // Silently fail - SW is optional for demo
        })
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

  const showNav = location.pathname === '/' || location.pathname.startsWith('/listings/')

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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/listings/:categoryId" element={<ListingsPage />} />
            <Route path="/profile/:providerId" element={<ProfilePage />} />
            <Route path="/booking/:providerId" element={<BookingPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Suspense>
      </main>

      <Toast />

      {showNav && <BottomNav />}
    </div>
  )
}
