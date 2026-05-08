'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronLeft, MapPin, Star, SlidersHorizontal } from 'lucide-react'
import { useStore } from '@/_store'
import { useLayout } from '@/_context/LayoutContext'
import { getProvidersByCategory, categories } from '@/_lib/data'

const filters = ['All', 'Available Today', 'Top Rated', 'Near Me']

export default function ListingsPageClient() {
  const { setShowFoliage } = useStore()
  const { isMobile } = useLayout()
  const params = useParams()
  const categoryId = params.categoryId as string
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    setShowFoliage(false)
  }, [setShowFoliage])

  const categoryName =
    categories.find((c) => c.id === categoryId)?.name || 'Services'
  const allProviders = categoryId
    ? getProvidersByCategory(categoryId)
    : []

  const filteredProviders =
    activeFilter === 'Available Today'
      ? allProviders.filter((p) => p.availableToday)
      : activeFilter === 'Top Rated'
        ? [...allProviders].sort((a, b) => b.rating - a.rating)
        : allProviders

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.provider-card', {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [filteredProviders])

  const handleProviderTap = (provider: (typeof allProviders)[0]) => {
    router.push(`/profile/${provider.id}`)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col"
      style={{
        background: '#F7F6F0',
        paddingBottom: isMobile ? '80px' : undefined,
        paddingTop: isMobile ? undefined : '56px',
      }}
    >
      <div
        className="sticky top-0 z-40 flex items-center"
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
          {categoryName}
        </h2>
        <button className="ml-auto active:opacity-70 transition-opacity">
          <SlidersHorizontal size={20} color="#FFFFFF" />
        </button>
      </div>

      <div
        className="sticky z-30 flex gap-2 no-scrollbar"
        style={{
          top: '56px',
          background: '#F7F6F0',
          padding: '12px 16px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
        }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            className="flex-shrink-0 transition-colors duration-150"
            style={{
              height: '36px',
              borderRadius: '18px',
              padding: '0 16px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              scrollSnapAlign: 'start',
              background: activeFilter === filter ? '#0F3D2E' : '#FFFFFF',
              color: activeFilter === filter ? '#FFFFFF' : '#5A5A5A',
              border:
                activeFilter === filter
                  ? 'none'
                  : '1px solid #EDEADF',
            }}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 px-4" style={{ paddingTop: '4px' }}>
        {filteredProviders.map((provider) => (
          <button
            key={provider.id}
            className="provider-card flex items-start gap-4 text-left active:scale-[0.98] transition-transform duration-100"
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
            onClick={() => handleProviderTap(provider)}
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="flex-shrink-0 object-cover"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '12px',
              }}
              loading="lazy"
            />
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    lineHeight: 1.3,
                  }}
                >
                  {provider.name}
                </span>
                {provider.verified && (
                  <span
                    className="flex-shrink-0"
                    style={{
                      background: '#0F3D2E',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1" style={{ marginTop: '4px' }}>
                <MapPin size={12} color="#8A8A8A" />
                <span
                  style={{
                    fontSize: '13px',
                    color: '#5A5A5A',
                    lineHeight: 1.4,
                  }}
                >
                  {provider.location}
                </span>
              </div>
              <div
                className="flex items-center justify-between"
                style={{ marginTop: '8px' }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1A1A1A',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {provider.priceRange}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={14} color="#D4A843" fill="#D4A843" />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                    }}
                  >
                    {provider.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5" style={{ marginTop: '10px' }}>
                {provider.availableToday && (
                  <span
                    style={{
                      background: 'rgba(46, 139, 87, 0.08)',
                      color: '#2E8B57',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                    }}
                  >
                    Available Today
                  </span>
                )}
                {provider.popular && (
                  <span
                    style={{
                      background: 'rgba(196, 86, 40, 0.08)',
                      color: '#C45628',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                    }}
                  >
                    Popular
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
