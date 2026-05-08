'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronLeft, Heart, Hammer, Sparkles, Wrench, AlertCircle } from 'lucide-react'
import { useStore } from '@/store'
import { useLayout } from '@/context/LayoutContext'
import { categories } from '@/data'

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Heart,
  Hammer,
  Sparkles,
  Wrench,
}

export default function CategoryPage() {
  const { setShowFoliage } = useStore()
  const { isMobile } = useLayout()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowFoliage(true)
  }, [setShowFoliage])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.category-grid-wrapper', {
        y: 20,
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.from('.urgency-footer', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/listings/${categoryId}`)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col"
      style={{
        paddingBottom: isMobile ? '80px' : undefined,
        paddingTop: isMobile ? undefined : '56px',
      }}
    >
      <div
        className="fixed inset-0 z-0"
        style={{ background: 'rgba(15, 61, 46, 0.5)' }}
      />

      <div
        className="relative z-10 flex items-center"
        style={{
          height: '56px',
          background: '#0F3D2E',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          padding: '0 16px',
        }}
      >
        <button
          className="flex items-center gap-1 active:opacity-70 transition-opacity"
          onClick={() => router.back()}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <h2
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Pilay serbisyo?
        </h2>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <div className="category-grid-wrapper grid w-full max-w-[320px] grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              <button
                key={cat.id}
                className="flex flex-col items-center justify-center active:scale-95 transition-transform duration-100"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '24px 16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  aspectRatio: '1 / 1.1',
                  border: 'none',
                  opacity: 1,
                }}
                onClick={() => handleCategorySelect(cat.id)}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#EDEADF',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color="#0F3D2E" />
                </div>
                <span
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    marginTop: '16px',
                    lineHeight: 1.2,
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#8A8A8A',
                    marginTop: '4px',
                    letterSpacing: '0.03em',
                    lineHeight: 1.2,
                  }}
                >
                  {cat.cebuano}
                </span>
              </button>
            )
          })}
        </div>

        <div
          className="urgency-footer flex items-center gap-1.5"
          style={{
            marginTop: '20px',
            background: 'rgba(196, 86, 40, 0.12)',
            borderRadius: '8px',
            padding: '8px 16px',
            border: '1px solid rgba(196, 86, 40, 0.2)',
          }}
        >
          <AlertCircle size={12} color="#C45628" />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#C45628',
              letterSpacing: '0.03em',
            }}
          >
            Only 2 providers left in your area
          </span>
        </div>
      </div>
    </div>
  )
}
