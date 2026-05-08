import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MapPin, TrendingUp } from 'lucide-react'
import { useStore } from '../store'

gsap.registerPlugin()

export default function LandingPage() {
  const { setShowFoliage } = useStore()
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
        paddingBottom: '80px',
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(15,61,46,0.55) 0%, rgba(15,61,46,0.35) 50%, rgba(15,61,46,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar */}
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
              fontSize: '20px',
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
              fontSize: '13px',
              fontWeight: 500,
              color: '#FFFFFF',
            }}
          >
            Cebu City
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6"
        style={{ paddingTop: '80px', paddingBottom: '40px' }}
      >
        {/* Headline */}
        <h1
          className="hero-headline text-center"
          style={{
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            maxWidth: '300px',
          }}
        >
          Pangita og serbisyo? Dali ra diri.
        </h1>

        {/* Subtext */}
        <p
          className="hero-subtext text-center"
          style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.85)',
            marginTop: '12px',
            maxWidth: '280px',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >
          Massage, panday, limpyo balay, ug uban pa
        </p>

        {/* Activity Row */}
        <div
          className="activity-row flex items-center justify-center gap-4"
          style={{ marginTop: '24px' }}
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
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.02em',
              }}
            >
              3 booking now
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={12} color="rgba(255,255,255,0.7)" />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.02em',
              }}
            >
              100+ this week
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex w-full flex-col items-center"
          style={{ marginTop: '32px', maxWidth: '320px' }}
        >
          <Link
            to="/category"
            className="cta-primary w-full active:scale-[0.97] transition-transform duration-100 flex items-center justify-center"
            style={{
              height: '52px',
              background: '#FFFFFF',
              color: '#0F3D2E',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            Book Now
          </Link>
          <Link
            to="/signup"
            className="cta-secondary w-full active:scale-[0.97] active:bg-white/10 transition-all duration-100 flex items-center justify-center"
            style={{
              height: '48px',
              background: 'transparent',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.5)',
              marginTop: '12px',
            }}
          >
            Apply as Provider
          </Link>
        </div>
      </div>
    </div>
  )
}
