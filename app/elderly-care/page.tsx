"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Star, Phone, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const translations = {
  ar: {
    elderlyCare: "رعاية كبار السن",
    providers: "مقدمي الخدمة",
    back: "العودة",
    years: "سنوات الخبرة",
    rating: "التقييم",
    distance: "المسافة",
    km: "كم",
    call: "اتصل",
    book: "احجز",
    changeLanguage: "English",
  },
  en: {
    elderlyCare: "Elderly Care",
    providers: "Service Providers",
    back: "Back",
    years: "Years of Experience",
    rating: "Rating",
    distance: "Distance",
    km: "km",
    call: "Call",
    book: "Book",
    changeLanguage: "العربية",
  },
}

interface Provider {
  id: number
  name: string
  nameEn: string
  image: string
  experience: number
  rating: number
  distance: number
  phone: string
}

export default function ElderlyCare() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const isArabic = language === "ar"
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
  }, [])

  const providers: Provider[] = [
    {
      id: 1,
      name: "أحمد محمد",
      nameEn: "Ahmed Mohamed",
      image: "/images/caregiver-male.png",
      experience: 5,
      rating: 4.8,
      distance: 2.3,
      phone: "+123456789",
    },
    {
      id: 2,
      name: "سارة أحمد",
      nameEn: "Sara Ahmed",
      image: "/images/caregiver-female.png",
      experience: 7,
      rating: 4.9,
      distance: 3.1,
      phone: "+123456789",
    },
    {
      id: 3,
      name: "محمد علي",
      nameEn: "Mohamed Ali",
      image: "/images/caregiver-male.png",
      experience: 4,
      rating: 4.7,
      distance: 1.8,
      phone: "+123456789",
    },
  ]

  // If not mounted yet, return a simple loading state to prevent hydration errors
  if (!mounted) {
    return <div className="min-h-screen bg-gray-100"></div>
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${isArabic ? "rtl" : "ltr"} pt-20`}>
      <div className="container mx-auto px-4">
        {/* Language toggle button at the top of the page */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Globe className="h-5 w-5" />
            <span>{t.changeLanguage}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.push("/homepage")}
              className="flex items-center gap-3 text-gray-600 hover:text-[rgba(255,22,22,1)]"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="ml-2">{t.back}</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-[rgba(255,22,22,1)] rounded-full flex items-center justify-center">
                <Image
                  src="/images/elderly-care-logo.png"
                  alt="Elderly Care"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold">{t.elderlyCare}</h1>
            </div>
            <div className="bg-[rgba(255,22,22,1)] text-white py-1 px-4 rounded-full text-sm">{t.providers}</div>
          </div>

          <div className="space-y-6">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={provider.image || "/placeholder.svg"}
                      alt={isArabic ? provider.name : provider.nameEn}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-center md:text-left">
                      {isArabic ? provider.name : provider.nameEn}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-gray-500 text-sm">{t.years}</p>
                        <p className="font-bold">{provider.experience}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 text-sm">{t.rating}</p>
                        <p className="font-bold flex items-center justify-center">
                          {provider.rating} <Star className="h-4 w-4 text-yellow-500 ml-1" />
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 text-sm">{t.distance}</p>
                        <p className="font-bold">
                          {provider.distance} {t.km}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <a
                      href={`tel:${provider.phone}`}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-3"
                    >
                      <Phone className="h-5 w-5" />
                      {t.call}
                    </a>
                    <button className="bg-[rgba(255,22,22,1)] text-white px-4 py-2 rounded-lg">{t.book}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
