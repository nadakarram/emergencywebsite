"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      router.push("/emergency-form")
    }, 1000) // Changed from 2000ms to 1000ms (1 second)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-40 h-40 mb-6"
          >
            <div className="flex flex-col items-center">
              <div className="text-[rgba(255,22,22,1)]" style={{ fontSize: "120px" }}>
                +
              </div>
              <div className="text-3xl font-bold text-black">طوارئ</div>
            </div>
          </motion.div>
          <motion.div
            className="mt-8 w-16 h-1 bg-[rgba(255,22,22,1)]"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
