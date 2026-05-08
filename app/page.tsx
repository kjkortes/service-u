'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MapPin, TrendingUp } from 'lucide-react'
import { useStore } from '@/store'
import { useLayout } from '@/context/LayoutContext'

gsap.registerPlugin()

export default function LandingPage() {
  const { setShowFoliage } = useStore()
  const { isMobile } = useLayout()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowFoliage(true)
  }, [setShowFoliage])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-headline', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          '.hero-subtext',
          { y: 16, opacity: 0, duration: 0.5 },
          '-=0.35',
        )
        .from(
          '.activity-row',
          { y: 12, opacity: 0, duration: 0.4 },
          '-=0.25',
        )
        .from(
          '.cta-primary',
          { y: 16, scale: 0.95, opacity: 0, duration: 0.5 },
          '-=0.15',
        )
        .from(
          '.cta-secondary',
          { y: 16, scale: 0.95, opacity: 0, duration: 0.5 },
          '-=0.3',
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col"
      style={{
        minHeight: '100vh',
        paddingBottom: isMobile ? '80px' : undefined,
        paddingTop: isMobile ? undefined : '56px',
      }}
    >
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(15,61,46,0.55) 0%, rgba(15,61,46,0.35) 50%, rgba(15,61,46,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{ padding: '12px 16px', height: '56px' }}
      >
        <div className="flex items-center gap-2">
          <img
            src="/images/app-logo.jpg"
            alt="Service-U"
            className="rounded-full"
            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
          />
          <span
            style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 700,
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Service-U
          </span>
        </div>
        <div
          className="flex items-center gap-1"
          style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '6px 14px',
          }}
        >
          <MapPin size={14} color="rgba(255,255,255,0.7)" />
          <span
            style={{
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: 500,
              color: '#FFFFFF',
            }}
          >
            Cebu City
          </span>
        </div>
      </div>

      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6"
        style={{ paddingTop: '80px', paddingBottom: '40px' }}
      >
        <h1
          className="hero-headline text-center"
          style={{
            fontSize: isMobile ? '32px' : '56px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            maxWidth: isMobile ? '300px' : '640px',
          }}
        >
          Pangita og serbisyo? Dali ra diri.
        </h1>

        <p
          className="hero-subtext text-center"
          style={{
            fontSize: isMobile ? '15px' : '20px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.85)',
            marginTop: isMobile ? '12px' : '16px',
            maxWidth: isMobile ? '280px' : '520px',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >
          Massage, panday, limpyo balay, ug uban pa
        </p>

        <div
          className="activity-row flex items-center justify-center gap-4"
          style={{ marginTop: isMobile ? '24px' : '32px' }}
        >
          <div className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{
                width: '6px',
                height: '6px',
                background: '#2E8B57',
                animation: 'pulse-dot 2s infinite',
              }}
            />
            <span
              style={{
                fontSize: isMobile ? '11px' : '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.02em',
              }}
            >
              3 booking now
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={isMobile ? 12 : 16} color="rgba(255,255,255,0.7)" />
            <span
              style={{
                fontSize: isMobile ? '11px' : '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.02em',
              }}
            >
              100+ this week
            </span>
          </div>
        </div>

        <div
          className="flex w-full flex-col items-center"
          style={{ marginTop: isMobile ? '32px' : '48px', maxWidth: isMobile ? '320px' : '420px' }}
        >
          <Link
            href="/category"
            className="cta-primary w-full active:scale-[0.97] transition-transform duration-100 flex items-center justify-center"
            style={{
              height: isMobile ? '52px' : '60px',
              background: '#FFFFFF',
              color: '#0F3D2E',
              borderRadius: '12px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            Book Now
          </Link>
          <Link
            href="/signup"
            className="cta-secondary w-full active:scale-[0.97] active:bg-white/10 transition-all duration-100 flex items-center justify-center"
            style={{
              height: isMobile ? '48px' : '56px',
              background: 'transparent',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.5)',
              marginTop: isMobile ? '12px' : '16px',
            }}
          >
            Apply as Provider
          </Link>
        </div>
      </div>
    </div>
  )
}
