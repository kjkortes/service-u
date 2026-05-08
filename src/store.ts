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
  currentPage: string
  previousPage: string | null
  selectedCategory: string | null
  selectedProvider: Provider | null
  bookingState: 'idle' | 'submitting' | 'confirmed'
  toast: { message: string } | null
  showFoliage: boolean

  navigate: (page: string) => void
  goBack: () => void
  setCategory: (category: string) => void
  setProvider: (provider: Provider | null) => void
  setBookingState: (state: 'idle' | 'submitting' | 'confirmed') => void
  showToast: (message: string) => void
  clearToast: () => void
  setShowFoliage: (show: boolean) => void
}

export const useStore = create<AppState>((set, get) => ({
  currentPage: 'landing',
  previousPage: null,
  selectedCategory: null,
  selectedProvider: null,
  bookingState: 'idle',
  toast: null,
  showFoliage: true,

  navigate: (page) => {
    const state = get()
    set({
      previousPage: state.currentPage,
      currentPage: page,
    })
  },

  goBack: () => {
    const state = get()
    if (state.previousPage) {
      set({ currentPage: state.previousPage, previousPage: null })
    } else {
      set({ currentPage: 'landing' })
    }
  },

  setCategory: (category) => set({ selectedCategory: category }),
  setProvider: (provider) => set({ selectedProvider: provider }),
  setBookingState: (bookingState) => set({ bookingState }),
  showToast: (message) => set({ toast: { message } }),
  clearToast: () => set({ toast: null }),
  setShowFoliage: (show) => set({ showFoliage: show }),
}))
