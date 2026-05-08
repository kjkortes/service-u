'use client'

import { useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronLeft, MapPin, Star, Share2, Clock, Shield } from 'lucide-react'
import { useStore } from '@/_store'
import { useLayout } from '@/_context/LayoutContext'
import { getProviderById } from '@/_lib/data'

export default function ProfilePageClient() {
  const { setShowFoliage } = useStore()
  const { isMobile } = useLayout()
  const params = useParams()
  const providerId = params.providerId as string
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedProvider = providerId ? getProviderById(providerId) : undefined

  useEffect(() => {
    setShowFoliage(true)
  }, [setShowFoliage])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.profile-photo', { opacity: 0, duration: 0.4 })
        .from('.info-card', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.stats-row', { y: 12, opacity: 0, duration: 0.4 }, '-=0.25')
        .from('.reviews-section', { y: 12, opacity: 0, duration: 0.4 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  if (!selectedProvider) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#F7F6F0' }}>
        <p style={{ color: '#5A5A5A' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col"
      style={{
        paddingBottom: isMobile ? '140px' : undefined,
        paddingTop: isMobile ? undefined : '56px',
      }}
    >
      <div className="fixed inset-0 z-0" style={{ background: 'rgba(15, 61, 46, 0.5)' }} />
      <div
        className="relative z-10 flex items-center"
        style={{ height: '56px', background: '#0F3D2E', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '0 16px' }}
      >
        <button className="flex items-center gap-1 active:opacity-70 transition-opacity" onClick={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF' }}>Back</span>
        </button>
        <button className="ml-auto active:opacity-70 transition-opacity">
          <Share2 size={20} color="#FFFFFF" />
        </button>
      </div>
      <div className="profile-photo relative z-10">
        <img src={selectedProvider.image} alt={selectedProvider.name} className="w-full object-cover" style={{ height: '200px', borderRadius: '0 0 20px 20px' }} />
        <div className="absolute inset-0" style={{ borderRadius: '0 0 20px 20px', background: 'linear-gradient(to top, rgba(15,61,46,0.8) 0%, transparent 60%)' }} />
        <h1 className="absolute" style={{ bottom: '24px', left: '16px', fontSize: '24px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
          {selectedProvider.name}
        </h1>
      </div>
      <div className="info-card relative z-20" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', margin: '-24px 16px 0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
        <div>
          <span style={{ fontSize: '17px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3, textTransform: 'capitalize' }}>{selectedProvider.category} Service</span>
          <div className="flex items-center gap-1" style={{ marginTop: '4px' }}>
            <MapPin size={12} color="#8A8A8A" />
            <span style={{ fontSize: '13px', color: '#5A5A5A', lineHeight: 1.4 }}>{selectedProvider.location}</span>
          </div>
        </div>
        <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.5, color: '#5A5A5A', marginTop: '12px' }}>{selectedProvider.description}</p>
        <div className="flex flex-wrap gap-2" style={{ marginTop: '16px' }}>
          {selectedProvider.verified && (
            <span className="flex items-center gap-1" style={{ background: '#0F3D2E', color: '#FFFFFF', borderRadius: '6px', padding: '6px 12px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.03em' }}>
              <Shield size={12} />Verified
            </span>
          )}
          <span className="flex items-center gap-1" style={{ background: '#EDEADF', color: '#5A5A5A', borderRadius: '6px', padding: '6px 12px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.03em' }}>
            <Clock size={12} />Responds in {selectedProvider.responseTime.replace('< ', '')}
          </span>
          <span style={{ background: '#EDEADF', color: '#5A5A5A', borderRadius: '6px', padding: '6px 12px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.03em' }}>Home Service</span>
        </div>
      </div>
      <div className="stats-row relative z-10 flex items-center" style={{ marginTop: '20px', padding: '0 16px' }}>
        <div className="flex flex-1 flex-col items-center">
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{selectedProvider.responseTime}</span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#8A8A8A', marginTop: '4px', letterSpacing: '0.03em' }}>Response</span>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#EDEADF' }} />
        <div className="flex flex-1 flex-col items-center">
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{selectedProvider.bookings}</span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#8A8A8A', marginTop: '4px', letterSpacing: '0.03em' }}>Bookings</span>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#EDEADF' }} />
        <div className="flex flex-1 flex-col items-center">
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{selectedProvider.memberSince}</span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#8A8A8A', marginTop: '4px', letterSpacing: '0.03em' }}>Member</span>
        </div>
      </div>
      <div className="reviews-section relative z-10" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1A1A1A', paddingLeft: '16px' }}>What customers say</h3>
        <div className="flex gap-3 no-scrollbar" style={{ marginTop: '12px', paddingLeft: '16px', paddingRight: '16px', overflowX: 'auto' }}>
          {selectedProvider.reviews.map((review, idx) => (
            <div key={idx} className="flex-shrink-0" style={{ width: '260px', background: '#FFFFFF', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} color="#D4A843" fill={i < review.rating ? '#D4A843' : 'none'} />
                ))}
              </div>
              <p style={{ fontSize: '13px', fontWeight: 400, lineHeight: 1.4, color: '#5A5A5A', marginTop: '8px' }}>&ldquo;{review.text}&rdquo;</p>
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#8A8A8A', marginTop: '8px', letterSpacing: '0.03em' }}>{review.author}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50" style={{ padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px) + 64px)', background: 'linear-gradient(to top, #F7F6F0 0%, transparent 100%)' }}>
        <button
          className="w-full active:scale-[0.97] active:bg-[#1A5C45] transition-all duration-100"
          style={{ height: '52px', background: '#0F3D2E', color: '#FFFFFF', borderRadius: '12px', fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          onClick={() => router.push(`/booking/${providerId}`)}
        >
          Book Now &mdash; {selectedProvider.priceRange.split('\u2013')[0].trim()}
        </button>
      </div>
    </div>
  )
}
