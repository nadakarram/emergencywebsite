"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect to homepage after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false)
      router.push("/homepage")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="mb-8 relative">
          <Image
            src="/images/emergency-logo.png"
            alt="Emergency Logo"
            width={150}
            height={150}
            priority
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-[rgba(255,22,22,1)] mb-4">طوارئ</h1>
        <p className="text-gray-600 text-xl">خدمات طبية منزلية</p>

        {loading && (
          <div className="mt-8">
            <div className="w-16 h-16 border-t-4 border-[rgba(255,22,22,1)] border-solid rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  )
}
