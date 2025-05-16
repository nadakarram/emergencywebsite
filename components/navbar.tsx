"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Users, Activity, Ambulance, Phone, Globe } from "lucide-react"
import Image from "next/image"

type ServiceCategory = "medical" | "elderly" | "physical" | "emergency" | null
type Language = "ar" | "en"

interface NavbarProps {
  onCategorySelect?: (category: ServiceCategory) => void
}

export default function Navbar({ onCategorySelect }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState<Language>("ar")
  const router = useRouter()

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
    if (onCategorySelect) {
      onCategorySelect(category)
    } else {
      router.push("/homepage")
    }
    setIsMenuOpen(false)
  }

  const handleEmergency = () => {
    router.push("/emergency-form")
  }

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
    // In a real app, you would store this in localStorage or context
  }

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md py-2" : "py-3"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center">
            <div className="flex items-center">
              <Image src="/images/emergency-logo.png" alt="Emergency Logo" width={40} height={40} className="mr-2" />
              <span className="text-2xl font-bold text-[rgba(255,22,22,1)] hidden sm:inline">طوارئ</span>
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
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 rtl:space-x-reverse">
            <Link
              href="/homepage"
              className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base"
            >
              <Home className="h-5 w-5" />
              <span className="inline">الرئيسية</span>
            </Link>

            <button
              onClick={() => handleCategoryClick("medical")}
              className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base"
            >
              <Users className="h-5 w-5" />
              <span className="inline">زيارات الطبيب المنزلية</span>
            </button>

            <button
              onClick={() => handleCategoryClick("elderly")}
              className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base"
            >
              <Activity className="h-5 w-5" />
              <span className="inline">رعاية كبار السن</span>
            </button>

            <button
              onClick={() => handleCategoryClick("physical")}
              className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors px-2 py-2 rounded-md hover:bg-gray-50 text-sm lg:text-base"
            >
              <Phone className="h-5 w-5" />
              <span className="inline">العلاج الطبيعي في المنزل</span>
            </button>

            <button
              onClick={handleEmergency}
              className="flex items-center space-x-1 rtl:space-x-reverse bg-[rgba(255,22,22,1)] text-white py-2 px-3 lg:px-4 rounded-lg hover:bg-[rgba(220,20,20,1)] transition-colors text-sm lg:text-base"
            >
              <Ambulance className="h-5 w-5" />
              <span>طوارئ</span>
            </button>

            {/* Language toggle button - moved to the end */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              <Globe className="h-5 w-5" />
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>
          </nav>

          {/* Contact button - always visible on desktop */}
          <div className="hidden md:block">
            <Link
              href="tel:+123456789"
              className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-100 text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              <Phone className="h-5 w-5" />
              <span className="inline">اتصل بنا</span>
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
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 flex-shrink-0" />
                <span>الرئيسية</span>
              </Link>

              <button
                onClick={() => handleCategoryClick("medical")}
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full"
              >
                <Users className="h-5 w-5 flex-shrink-0" />
                <span>زيارات الطبيب المنزلية</span>
              </button>

              <button
                onClick={() => handleCategoryClick("elderly")}
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full"
              >
                <Activity className="h-5 w-5 flex-shrink-0" />
                <span>رعاية كبار السن</span>
              </button>

              <button
                onClick={() => handleCategoryClick("physical")}
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>العلاج الطبيعي في المنزل</span>
              </button>

              <button
                onClick={handleEmergency}
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium bg-[rgba(255,22,22,1)] text-white hover:bg-[rgba(220,20,20,1)] w-full"
              >
                <Ambulance className="h-5 w-5 flex-shrink-0" />
                <span>طوارئ</span>
              </button>

              <Link
                href="tel:+123456789"
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>اتصل بنا</span>
              </Link>

              {/* Language toggle in mobile menu */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md text-base font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 w-full"
              >
                <Globe className="h-5 w-5 flex-shrink-0" />
                <span>{language === "ar" ? "English" : "العربية"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
