import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useStore } from '@/_store'

export default function Toast() {
  const { toast, clearToast } = useStore()

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast, clearToast])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed top-4 left-4 right-4 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div
            className="flex items-center gap-2 pointer-events-auto"
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              maxWidth: '90vw',
            }}
          >
            <CheckCircle size={16} color="#2E8B57" />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#1A1A1A',
              }}
            >
              {toast.message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
