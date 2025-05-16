"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Users, Activity, Ambulance, Phone } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

type ServiceCategory = "medical" | "elderly" | "physical" | "emergency" | null

interface NavbarProps {
  onCategorySelect?: (category: ServiceCategory) => void
}

const translations = {
  ar: {
    home: "الرئيسية",
    doctorVisits: "زيارات الطبيب المنزلية",
    elderlyCare: "رعاية كبار السن",
    physicalTherapy: "العلاج الطبيعي في المنزل",
    emergency: "طوارئ",
    callUs: "اتصل بنا",
    services: "الخدمات",
  },
  en: {
    home: "Home",
    doctorVisits: "Doctor Home Visits",
    elderlyCare: "Elderly Care",
    physicalTherapy: "Home Physical Therapy",
    emergency: "Emergency",
    callUs: "Call Us",
    services: "Services",
  },
}

export default function Navbar({ onCategorySelect }: NavbarProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1200) // Default to desktop view
  const [isMounted, setIsMounted] = useState(false)

  const isArabic = language === "ar"
  const t = translations[language]

  // Handle client-side only code
  useEffect(() => {
    setIsMounted(true)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCategoryClick = (category: ServiceCategory) => {
    if (category === "elderly") {
      router.push("/elderly-care")
      setIsMenuOpen(false)
      setIsServicesOpen(false)
      return
    }

    if (onCategorySelect) {
      onCategorySelect(category)
    } else {
      router.push("/homepage")
    }
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  const handleEmergency = () => {
    router.push("/emergency-form")
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  // Determine if we should use the dropdown for services based on screen width
  const useServicesDropdown = isMounted && windowWidth < 1024

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md py-2" : "py-3"} ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/images/emergency-logo.png"
                alt="Emergency Logo"
                width={40}
                height={40}
                className={isArabic ? "ml-2" : "mr-2"}
              />
              <span className="text-2xl font-bold text-[rgba(255,22,22,1)] hidden sm:inline">
                {isArabic ? "طوارئ" : "Emergency"}
              </span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className={`hidden md:flex items-center ${isArabic ? "space-x-reverse" : ""} space-x-4`}>
            <Link
              href="/homepage"
              className={`flex items-center ${
                isArabic ? "space-x-reverse" : ""
              } space-x-1 text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base`}
            >
              <Home className="h-5 w-5" />
              <span className="inline">{t.home}</span>
            </Link>

            {useServicesDropdown ? (
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center ${
                    isArabic ? "space-x-reverse" : ""
                  } space-x-1 text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base`}
                >
                  <Menu className="h-5 w-5" />
                  <span className="inline">{t.services}</span>
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg py-1 z-50 min-w-[200px]">
                    <button
                      onClick={() => handleCategoryClick("medical")}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <Users className="h-5 w-5 mr-2" />
                      <span>{t.doctorVisits}</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick("elderly")}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <Activity className="h-5 w-5 mr-2" />
                      <span>{t.elderlyCare}</span>
                    </button>
                    <button
                      onClick={() => handleCategoryClick("physical")}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{t.physicalTherapy}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleCategoryClick("medical")}
                  className={`flex items-center ${
                    isArabic ? "space-x-reverse" : ""
                  } space-x-1 text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base`}
                >
                  <Users className="h-5 w-5" />
                  <span className="inline">{t.doctorVisits}</span>
                </button>

                <button
                  onClick={() => handleCategoryClick("elderly")}
                  className={`flex items-center ${
                    isArabic ? "space-x-reverse" : ""
                  } space-x-1 text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base`}
                >
                  <Activity className="h-5 w-5" />
                  <span className="inline">{t.elderlyCare}</span>
                </button>

                <button
                  onClick={() => handleCategoryClick("physical")}
                  className={`flex items-center ${
                    isArabic ? "space-x-reverse" : ""
                  } space-x-1 text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base`}
                >
                  <Phone className="h-5 w-5" />
                  <span className="inline">{t.physicalTherapy}</span>
                </button>
              </>
            )}

            <button
              onClick={handleEmergency}
              className={`flex items-center ${
                isArabic ? "space-x-reverse" : ""
              } space-x-1 bg-[rgba(255,22,22,1)] text-white py-2 px-3 lg:px-4 rounded-lg hover:bg-[rgba(220,20,20,1)] transition-colors text-sm lg:text-base`}
            >
              <Ambulance className="h-5 w-5" />
              <span>{t.emergency}</span>
            </button>
          </nav>

          {/* Contact button - always visible on desktop */}
          <div className="hidden md:block">
            <Link
              href="tel:+123456789"
              className={`flex items-center ${
                isArabic ? "space-x-reverse" : ""
              } space-x-1 bg-gray-100 text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm`}
            >
              <Phone className="h-5 w-5" />
              <span className="inline">{t.callUs}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
              <Link
                href="/homepage"
                className={`flex items-center ${
                  isArabic ? "space-x-reverse" : ""
                } space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 flex-shrink-0" />
                <span>{t.home}</span>
              </Link>

              <button
                onClick={() => handleCategoryClick("medical")}
                className={`flex items-center ${
                  isArabic ? "space-x-reverse" : ""
                } space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full`}
              >
                <Users className="h-5 w-5 flex-shrink-0" />
                <span>{t.doctorVisits}</span>
              </button>

              <button
                onClick={() => handleCategoryClick("elderly")}
                className={`flex items-center ${
                  isArabic ? "space-x-reverse" : ""
                } space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full`}
              >
                <Activity className="h-5 w-5 flex-shrink-0" />
                <span>{t.elderlyCare}</span>
              </button>

              <button
                onClick={() => handleCategoryClick("physical")}
                className={`flex items-center ${
                  isArabic ? "space-x-reverse" : ""
                } space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full`}
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{t.physicalTherapy}</span>
              </button>

              <button
                onClick={handleEmergency}
                className={`flex items-center ${
                  isArabic ? "space-x-reverse" : ""
                } space-x-3 px-3 py-2 rounded-md text-base font-medium bg-[rgba(255,22,22,1)] text-white hover:bg-[rgba(220,20,20,1)] w-full`}
              >
                <Ambulance className="h-5 w-5 flex-shrink-0" />
                <span>{t.emergency}</span>
              </button>

              <Link
                href="tel:+123456789"
                className={`flex items-center ${
                  isArabic ? "space-x-reverse" : ""
                } space-x-3 px-3 py-2 rounded-md text-base font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 w-full`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{t.callUs}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
