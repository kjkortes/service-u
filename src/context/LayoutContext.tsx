'use client'

import { createContext, useContext } from 'react'
import { useIsMobile } from '../hooks/use-mobile'

interface LayoutContextValue {
  isMobile: boolean
}

const LayoutContext = createContext<LayoutContextValue>({ isMobile: true })

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <LayoutContext.Provider value={{ isMobile }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
