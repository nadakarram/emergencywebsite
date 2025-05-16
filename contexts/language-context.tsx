"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
}

// Create a default context value to avoid the "must be used within a provider" error
const defaultContextValue: LanguageContextType = {
  language: "ar",
  toggleLanguage: () => {},
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function useLanguage() {
  return useContext(LanguageContext)
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("ar")
  const [mounted, setMounted] = useState(false)

  // Only run this effect on the client side
  useEffect(() => {
    setMounted(true)
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar"
    setLanguage(newLanguage)
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("language", newLanguage)
        document.documentElement.lang = newLanguage
        document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
      }
    } catch (error) {
      console.error("Error setting language:", error)
    }
  }

  // Provide the context value
  const contextValue: LanguageContextType = {
    language,
    toggleLanguage,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}
