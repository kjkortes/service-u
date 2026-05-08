import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronLeft, Wallet, Users, Shield } from 'lucide-react'
import { useStore } from '../store'
import { useLayout } from '../context/LayoutContext'
import { categories } from '../data'

const serviceOptions = categories.map((c) => c.name)

export default function SignupPage() {
  const { setShowFoliage, showToast } = useStore()
  const { isMobile } = useLayout()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    location: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [showServiceSheet, setShowServiceSheet] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setShowFoliage(false)
  }, [setShowFoliage])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-hero', { opacity: 0, duration: 0.3 })
      gsap.from('.signup-form', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.service.trim()) newErrors.service = true
    if (!formData.location.trim()) newErrors.location = true
    if (!formData.phone.trim()) newErrors.phone = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setSubmitted(true)
    showToast('Application submitted! We\'ll review within 24 hours.')
    setTimeout(() => {
      navigate('/')
    }, 2500)
  }

  const trustCards = [
    { icon: Wallet, label: 'Free to Join' },
    { icon: Users, label: 'Get Customers' },
    { icon: Shield, label: 'Verified Badge' },
  ]

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
      {/* Header Bar */}
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
          onClick={() => navigate(-1)}
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
          Apply as Provider
        </h2>
      </div>

      {/* Trust Hero */}
      <div
        className="trust-hero"
        style={{
          background: '#0F3D2E',
          padding: '24px 16px 32px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          Libre sa sugod. Walay bayad sa pag-apil.
        </h2>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.7)',
            marginTop: '8px',
          }}
        >
          Be one of the first providers in your area.
        </p>

        {/* Trust Cards */}
        <div
          className="flex gap-3 no-scrollbar"
          style={{
            marginTop: '20px',
            overflowX: 'auto',
          }}
        >
          {trustCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="flex flex-shrink-0 flex-col items-center"
                style={{
                  width: '140px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              >
                <Icon size={20} color="#FFFFFF" />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    marginTop: '8px',
                    letterSpacing: '0.03em',
                    textAlign: 'center',
                  }}
                >
                  {card.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Signup Form */}
      <div
        className="signup-form relative flex-1"
        style={{
          background: '#FFFFFF',
          borderRadius: '20px 20px 0 0',
          marginTop: '-16px',
          padding: '24px 16px',
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#5A5A5A',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Juan dela Cruz"
            className="w-full"
            style={{
              height: '48px',
              background: '#F7F6F0',
              border: errors.name
                ? '1.5px solid #C45628'
                : '1.5px solid #EDEADF',
              borderRadius: '12px',
              padding: '0 14px',
              fontSize: '15px',
              color: '#1A1A1A',
              marginTop: '6px',
              outline: 'none',
            }}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: false })
            }}
          />
          {errors.name && (
            <p
              style={{
                fontSize: '11px',
                color: '#C45628',
                marginTop: '4px',
              }}
            >
              Please enter your name
            </p>
          )}
        </div>

        {/* Service */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#5A5A5A',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Service You Offer
          </label>
          <button
            className="flex w-full items-center justify-between text-left"
            style={{
              height: '48px',
              background: '#F7F6F0',
              border: errors.service
                ? '1.5px solid #C45628'
                : '1.5px solid #EDEADF',
              borderRadius: '12px',
              padding: '0 14px',
              fontSize: '15px',
              color: formData.service ? '#1A1A1A' : '#8A8A8A',
              marginTop: '6px',
            }}
            onClick={() => setShowServiceSheet(true)}
          >
            <span>{formData.service || 'Select a service'}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#8A8A8A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {errors.service && (
            <p
              style={{
                fontSize: '11px',
                color: '#C45628',
                marginTop: '4px',
              }}
            >
              Please select a service
            </p>
          )}
        </div>

        {/* Location */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#5A5A5A',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Your Location
          </label>
          <input
            type="text"
            placeholder="Lahug, Cebu City"
            className="w-full"
            style={{
              height: '48px',
              background: '#F7F6F0',
              border: errors.location
                ? '1.5px solid #C45628'
                : '1.5px solid #EDEADF',
              borderRadius: '12px',
              padding: '0 14px',
              fontSize: '15px',
              color: '#1A1A1A',
              marginTop: '6px',
              outline: 'none',
            }}
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value })
              if (errors.location) setErrors({ ...errors, location: false })
            }}
          />
          {errors.location && (
            <p
              style={{
                fontSize: '11px',
                color: '#C45628',
                marginTop: '4px',
              }}
            >
              Please enter your location
            </p>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#5A5A5A',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="09XX XXX XXXX"
            className="w-full"
            style={{
              height: '48px',
              background: '#F7F6F0',
              border: errors.phone
                ? '1.5px solid #C45628'
                : '1.5px solid #EDEADF',
              borderRadius: '12px',
              padding: '0 14px',
              fontSize: '15px',
              color: '#1A1A1A',
              marginTop: '6px',
              outline: 'none',
            }}
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value })
              if (errors.phone) setErrors({ ...errors, phone: false })
            }}
          />
          {errors.phone && (
            <p
              style={{
                fontSize: '11px',
                color: '#C45628',
                marginTop: '4px',
              }}
            >
              Please enter your phone number
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="w-full active:scale-[0.97] active:bg-[#1A5C45] transition-all duration-100"
          style={{
            height: '52px',
            background: submitted ? '#2E8B57' : '#0F3D2E',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            marginTop: '24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? 'Application Sent!' : 'Submit Application'}
        </button>
      </div>

      {/* Service Selection Sheet */}
      {showServiceSheet && (
        <div
          className="fixed inset-0 z-[200] flex items-end"
          style={{ background: 'rgba(15, 61, 46, 0.45)' }}
          onClick={() => setShowServiceSheet(false)}
        >
          <div
            className="w-full"
            style={{
              background: '#FFFFFF',
              borderRadius: '20px 20px 0 0',
              padding: '24px 16px 32px',
              maxHeight: '50vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center" style={{ marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  background: '#8A8A8A',
                  borderRadius: '2px',
                }}
              />
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}
            >
              Select Service
            </h3>
            {serviceOptions.map((service) => (
              <button
                key={service}
                className="flex w-full items-center gap-3 text-left active:bg-[#F7F6F0] transition-colors"
                style={{
                  padding: '14px 12px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                }}
                onClick={() => {
                  setFormData({ ...formData, service })
                  setShowServiceSheet(false)
                  if (errors.service) setErrors({ ...errors, service: false })
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background:
                      formData.service === service ? '#0F3D2E' : '#EDEADF',
                  }}
                >
                  {service === 'Massage' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={formData.service === service ? '#FFFFFF' : '#5A5A5A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  )}
                  {service === 'Carpentry' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={formData.service === service ? '#FFFFFF' : '#5A5A5A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H16.14c-.85 0-1.65-.33-2.25-.93L12.64 4.72a1.93 1.93 0 0 0-2.74 0l-.77.77a1.91 1.91 0 0 0 0 2.74L9.5 9.5"/></svg>
                  )}
                  {service === 'Cleaning' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={formData.service === service ? '#FFFFFF' : '#5A5A5A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                  )}
                  {service === 'Repairs' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={formData.service === service ? '#FFFFFF' : '#5A5A5A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  )}
                </div>
                {service}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
