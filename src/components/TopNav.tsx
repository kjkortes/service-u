import { useLocation, useNavigate } from 'react-router'
import { Home, Calendar, MessageCircle, User } from 'lucide-react'
import { useStore } from '../store'

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'bookings', icon: Calendar, label: 'Bookings' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'profile', icon: User, label: 'Profile' },
] as const

export default function TopNav() {
  const { showToast } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = location.pathname === '/' ? 'home' : 'bookings'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
      style={{
        height: '56px',
        background: '#0F3D2E',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        padding: '0 16px',
      }}
    >
      <div className="flex items-center gap-2" style={{ minWidth: '120px' }}>
        <img
          src="/images/app-logo.jpg"
          alt="Service-U"
          className="rounded-full"
          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
        />
        <span
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#FFFFFF',
          }}
        >
          Service-U
        </span>
      </div>

      <div className="flex items-center gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              className="flex items-center gap-2 transition-opacity duration-150"
              style={{
                height: '40px',
                padding: '0 12px',
                borderRadius: '8px',
                opacity: isActive ? 1 : 0.5,
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
              onClick={() => {
                if (tab.id === 'home') {
                  navigate('/')
                } else if (tab.id === 'bookings') {
                  if (location.pathname !== '/') {
                    showToast('Your bookings will appear here')
                  }
                } else {
                  showToast('Coming soon!')
                }
              }}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.5}
                color="#FFFFFF"
              />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
