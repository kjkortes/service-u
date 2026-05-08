import { create } from 'zustand'

export interface Provider {
  id: string
  name: string
  category: string
  location: string
  priceRange: string
  rating: number
  image: string
  verified: boolean
  availableToday: boolean
  popular: boolean
  description: string
  responseTime: string
  bookings: string
  memberSince: string
  reviews: { text: string; author: string; rating: number }[]
}

interface AppState {
  bookingState: 'idle' | 'submitting' | 'confirmed'
  toast: { message: string } | null
  showFoliage: boolean

  setBookingState: (state: 'idle' | 'submitting' | 'confirmed') => void
  showToast: (message: string) => void
  clearToast: () => void
  setShowFoliage: (show: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  bookingState: 'idle',
  toast: null,
  showFoliage: true,

  setBookingState: (bookingState) => set({ bookingState }),
  showToast: (message) => set({ toast: { message } }),
  clearToast: () => set({ toast: null }),
  setShowFoliage: (show) => set({ showFoliage: show }),
}))
