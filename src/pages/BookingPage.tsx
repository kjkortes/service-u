import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Clock } from 'lucide-react'
import { useStore } from '../store'

export default function BookingPage() {
  const { navigate, goBack, selectedProvider, setShowFoliage } = useStore()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: selectedProvider?.category || '',
    notes: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowFoliage(true)
  }, [setShowFoliage])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.booking-sheet', {
        y: '100%',
        duration: 0.35,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim()) newErrors.phone = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setShowConfirmation(true)
  }

  const handleBackToHome = () => {
    navigate('landing')
  }

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
      style={{ paddingBottom: '80px' }}
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: 'rgba(15, 61, 46, 0.45)' }}
      />

      {/* Close Button */}
      <button
        className="relative z-10 ml-auto active:opacity-70 transition-opacity"
        style={{ padding: '16px' }}
        onClick={goBack}
      >
        <X size={24} color="#FFFFFF" />
      </button>

      {/* Bottom Sheet */}
      <div
        className="booking-sheet fixed bottom-0 left-0 right-0 z-20 flex flex-col"
        style={{
          background: '#FFFFFF',
          borderRadius: '20px 20px 0 0',
          padding: '24px 16px 32px',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          {!showConfirmation ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Drag Handle */}
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

              {/* Title */}
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                Book Service
              </h2>

              {/* Form Fields */}
              <div className="flex flex-col gap-4" style={{ marginTop: '24px' }}>
                {/* Name */}
                <div>
                  <label
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#5A5A5A',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Your Name
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

                {/* Phone */}
                <div>
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

                {/* Service (read-only) */}
                <div>
                  <label
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#5A5A5A',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Service
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full"
                    style={{
                      height: '48px',
                      background: '#F7F6F0',
                      border: '1.5px solid #EDEADF',
                      borderRadius: '12px',
                      padding: '0 14px',
                      fontSize: '15px',
                      color: '#5A5A5A',
                      marginTop: '6px',
                      outline: 'none',
                    }}
                    value={`${selectedProvider.category.charAt(0).toUpperCase() + selectedProvider.category.slice(1)} - ${selectedProvider.name}`}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#5A5A5A',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Any special requests?"
                    className="w-full resize-none"
                    style={{
                      height: '80px',
                      background: '#F7F6F0',
                      border: '1.5px solid #EDEADF',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      fontSize: '15px',
                      color: '#1A1A1A',
                      marginTop: '6px',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full active:scale-[0.97] active:bg-[#1A5C45] transition-all duration-100"
                style={{
                  height: '52px',
                  background: '#0F3D2E',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  marginTop: '24px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}
                onClick={handleSubmit}
              >
                Send Booking Request
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center py-8"
            >
              {/* Success Checkmark */}
              <motion.div
                className="flex items-center justify-center"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#0F3D2E',
                }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.6 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Check size={36} color="#FFFFFF" strokeWidth={3} />
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginTop: '24px',
                  textAlign: 'center',
                }}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Request Sent!
              </motion.h2>

              {/* Subtext */}
              <motion.p
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#5A5A5A',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                We'll connect you with your provider shortly.
              </motion.p>

              {/* Reinforcement */}
              <motion.div
                className="flex items-center gap-2"
                style={{
                  marginTop: '20px',
                  background: 'rgba(46, 139, 87, 0.08)',
                  borderRadius: '8px',
                  padding: '10px 16px',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Clock size={14} color="#2E8B57" />
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#2E8B57',
                  }}
                >
                  Providers typically respond within 10 minutes
                </span>
              </motion.div>

              {/* Back to Home */}
              <motion.button
                className="active:scale-[0.97] transition-transform duration-100"
                style={{
                  marginTop: '32px',
                  height: '48px',
                  background: 'transparent',
                  color: '#0F3D2E',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  border: '1.5px solid #0F3D2E',
                  padding: '0 32px',
                }}
                onClick={handleBackToHome}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
