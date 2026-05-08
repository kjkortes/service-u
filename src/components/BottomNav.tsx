import { useLocation, useNavigate } from 'react-router'
import { Home, Calendar, MessageCircle, User } from 'lucide-react'
import { useStore } from '../store'

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'bookings', icon: Calendar, label: 'Bookings' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'profile', icon: User, label: 'Profile' },
] as const

export default function BottomNav() {
  const { showToast } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = location.pathname === '/' ? 'home' : 'bookings'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around"
      style={{
        height: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background: '#0F3D2E',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            className="flex flex-col items-center justify-center gap-1 transition-opacity duration-150"
            style={{
              width: '64px',
              height: '52px',
              opacity: isActive ? 1 : 0.5,
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
              size={20}
              strokeWidth={isActive ? 2.5 : 1.5}
              color="#FFFFFF"
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.04em',
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <div
                className="rounded-full"
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#FFFFFF',
                  marginTop: '2px',
                }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
