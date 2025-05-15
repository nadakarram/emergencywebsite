"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

type ServiceCategory = "medical" | "elderly" | "physical" | "emergency" | null

interface NavbarProps {
  onCategorySelect?: (category: ServiceCategory) => void
}

export default function Navbar({ onCategorySelect }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleCategoryClick = (category: ServiceCategory) => {
    if (onCategorySelect) {
      onCategorySelect(category)
    } else {
      router.push("/homepage")
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/homepage" className="flex items-center">
            <span className="text-2xl font-bold text-[rgba(255,22,22,1)]">EMERGENCY</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleCategoryClick("medical")}
              className="text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors"
            >
              Medical Services
            </button>
            <button
              onClick={() => handleCategoryClick("elderly")}
              className="text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors"
            >
              Elderly Care
            </button>
            <button
              onClick={() => handleCategoryClick("physical")}
              className="text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors"
            >
              Home Physical Therapy
            </button>
            <button
              onClick={() => handleCategoryClick("emergency")}
              className="text-gray-700 hover:text-[rgba(255,22,22,1)] transition-colors"
            >
              Emergency
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
            <button
              onClick={() => handleCategoryClick("medical")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full text-left"
            >
              Medical Services
            </button>
            <button
              onClick={() => handleCategoryClick("elderly")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full text-left"
            >
              Elderly Care
            </button>
            <button
              onClick={() => handleCategoryClick("physical")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full text-left"
            >
              Home Physical Therapy
            </button>
            <button
              onClick={() => handleCategoryClick("emergency")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[rgba(255,22,22,1)] hover:bg-gray-50 w-full text-left"
            >
              Emergency
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
