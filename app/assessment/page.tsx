"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Globe } from "lucide-react"
import Image from "next/image"

type Step = "bleeding" | "breathing" | "transport" | "confirmation"
type Language = "ar" | "en"

// Translations for the assessment page
const translations = {
  ar: {
    emergency: "طوارئ",
    bleeding: "هل يوجد نزيف ؟",
    breathing: "هل المريض يتنفس ؟",
    transport: "طريقة النقل",
    yes: "نعم",
    no: "لا",
    back: "رجوع",
    goYourself: "ذهاب بنفسك",
    callAmbulance: "اتصل بسيارة",
    onTheWay: "نحن في الطريق",
    returnHome: "العودة للصفحة الرئيسية",
  },
  en: {
    emergency: "Emergency",
    bleeding: "Is there bleeding?",
    breathing: "Is the patient breathing?",
    transport: "Transport Method",
    yes: "Yes",
    no: "No",
    back: "Back",
    goYourself: "Go yourself",
    callAmbulance: "Call ambulance",
    onTheWay: "We are on the way",
    returnHome: "Return to homepage",
  },
}

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState<Step>("bleeding")
  const [bleeding, setBleeding] = useState<boolean | null>(null)
  const [breathing, setBreathing] = useState<boolean | null>(null)
  const [transport, setTransport] = useState<"self" | "ambulance" | null>(null)
  const [language, setLanguage] = useState<Language>("ar")
  const router = useRouter()

  const t = translations[language]
  const isArabic = language === "ar"

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  const handleNext = (nextStep: Step) => {
    setCurrentStep(nextStep)
  }

  const handleBack = () => {
    if (currentStep === "breathing") {
      setCurrentStep("bleeding")
    } else if (currentStep === "transport") {
      setCurrentStep("breathing")
    }
  }

  const handleComplete = () => {
    localStorage.setItem("patientBleeding", bleeding ? "yes" : "no")
    localStorage.setItem("patientBreathing", breathing ? "yes" : "no")
    localStorage.setItem("transportMethod", transport || "")

    // If they chose ambulance, show confirmation, otherwise go to hospitals
    if (transport === "ambulance") {
      setCurrentStep("confirmation")
    } else {
      router.push("/hospitals")
    }
  }

  return (
    <div className={`min-h-screen bg-white flex flex-col items-center justify-center p-6 ${isArabic ? "rtl" : "ltr"}`}>
      {/* Language toggle button */}
      <motion.button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Globe className="h-5 w-5 text-gray-700" />
        <span className="ml-1 text-sm">{isArabic ? "English" : "العربية"}</span>
      </motion.button>

      {currentStep === "bleeding" && (
        <motion.div
          className="w-full max-w-md flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%404x-igHwrnmhF1mji1zqZmotGGkICWxZh5.png"
                alt="Emergency Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-black tracking-wider mt-3" style={{ letterSpacing: "0.05em" }}>
              {t.emergency}
            </div>
          </div>

          <div className="bg-gray-200 rounded-full py-3 px-6 mb-12 w-full max-w-xs">
            <h1
              className="text-xl font-medium text-[#333] text-center tracking-wider"
              style={{ letterSpacing: "0.05em" }}
            >
              {isArabic ? (
                <>
                  هل يوجد <span className="text-[rgba(255,22,22,1)] font-bold">نزيف</span> ؟
                </>
              ) : (
                <>
                  Is there <span className="text-[rgba(255,22,22,1)] font-bold">bleeding</span>?
                </>
              )}
            </h1>
          </div>

          <div className="flex justify-center mb-12" style={{ gap: "120px" }}>
            <motion.button
              onClick={() => {
                setBleeding(false)
                handleNext("breathing")
              }}
              className="w-16 h-16 rounded-full border border-[rgba(255,22,22,1)] flex items-center justify-center text-[rgba(255,22,22,1)] tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ letterSpacing: "0.05em" }}
            >
              {t.no}
            </motion.button>
            <motion.button
              onClick={() => {
                setBleeding(true)
                handleNext("breathing")
              }}
              className="w-16 h-16 rounded-full border border-[rgba(255,22,22,1)] flex items-center justify-center text-[rgba(255,22,22,1)] tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ letterSpacing: "0.05em" }}
            >
              {t.yes}
            </motion.button>
          </div>

          <motion.button
            onClick={() => router.push("/emergency-form")}
            className="flex items-center text-gray-500 hover:text-[rgba(255,22,22,1)] tracking-wider"
            whileHover={{ scale: 1.05 }}
            style={{ letterSpacing: "0.05em" }}
          >
            {isArabic ? <ArrowRight className="h-4 w-4 ml-1" /> : null}
            {t.back}
            {!isArabic ? <ArrowRight className="h-4 w-4 mr-1 rotate-180" /> : null}
          </motion.button>
        </motion.div>
      )}

      {currentStep === "breathing" && (
        <motion.div
          className="w-full max-w-md flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%404x-igHwrnmhF1mji1zqZmotGGkICWxZh5.png"
                alt="Emergency Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-black tracking-wider mt-3" style={{ letterSpacing: "0.05em" }}>
              {t.emergency}
            </div>
          </div>

          <div className="bg-gray-200 rounded-full py-3 px-6 mb-12 w-full max-w-xs">
            <h1
              className="text-xl font-medium text-[#333] text-center tracking-wider"
              style={{ letterSpacing: "0.05em" }}
            >
              {isArabic ? (
                <>
                  هل المريض <span className="text-[rgba(255,22,22,1)] font-bold">يتنفس</span> ؟
                </>
              ) : (
                <>
                  Is the patient <span className="text-[rgba(255,22,22,1)] font-bold">breathing</span>?
                </>
              )}
            </h1>
          </div>

          <div className="flex justify-center mb-12" style={{ gap: "120px" }}>
            <motion.button
              onClick={() => {
                setBreathing(false)
                handleNext("transport")
              }}
              className="w-16 h-16 rounded-full border border-[rgba(255,22,22,1)] flex items-center justify-center text-[rgba(255,22,22,1)] tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ letterSpacing: "0.05em" }}
            >
              {t.no}
            </motion.button>
            <motion.button
              onClick={() => {
                setBreathing(true)
                handleNext("transport")
              }}
              className="w-16 h-16 rounded-full border border-[rgba(255,22,22,1)] flex items-center justify-center text-[rgba(255,22,22,1)] tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ letterSpacing: "0.05em" }}
            >
              {t.yes}
            </motion.button>
          </div>

          <motion.button
            onClick={handleBack}
            className="flex items-center text-gray-500 hover:text-[rgba(255,22,22,1)] tracking-wider"
            whileHover={{ scale: 1.05 }}
            style={{ letterSpacing: "0.05em" }}
          >
            {isArabic ? <ArrowRight className="h-4 w-4 ml-1" /> : null}
            {t.back}
            {!isArabic ? <ArrowRight className="h-4 w-4 mr-1 rotate-180" /> : null}
          </motion.button>
        </motion.div>
      )}

      {currentStep === "transport" && (
        <motion.div
          className="w-full max-w-md flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%404x-igHwrnmhF1mji1zqZmotGGkICWxZh5.png"
                alt="Emergency Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-black tracking-wider mt-3" style={{ letterSpacing: "0.05em" }}>
              {t.emergency}
            </div>
          </div>

          <div className="bg-gray-200 rounded-full py-3 px-6 mb-8 w-full max-w-xs">
            <h1
              className="text-xl font-medium text-[#333] text-center tracking-wider"
              style={{ letterSpacing: "0.05em" }}
            >
              {t.transport}
            </h1>
          </div>

          <div className="flex justify-center mb-12" style={{ gap: "40px" }}>
            <motion.button
              onClick={() => {
                setTransport("self")
                handleComplete()
              }}
              className="bg-gray-200 rounded-full py-3 px-6 text-center tracking-wider"
              style={{ minWidth: "140px", letterSpacing: "0.05em" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.goYourself}
            </motion.button>
            <motion.button
              onClick={() => {
                setTransport("ambulance")
                handleComplete()
              }}
              className="bg-gray-200 rounded-full py-3 px-6 text-center tracking-wider"
              style={{ minWidth: "140px", letterSpacing: "0.05em" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.callAmbulance}
            </motion.button>
          </div>

          <motion.button
            onClick={handleBack}
            className="flex items-center text-gray-500 hover:text-[rgba(255,22,22,1)] tracking-wider"
            whileHover={{ scale: 1.05 }}
            style={{ letterSpacing: "0.05em" }}
          >
            {isArabic ? <ArrowRight className="h-4 w-4 ml-1" /> : null}
            {t.back}
            {!isArabic ? <ArrowRight className="h-4 w-4 mr-1 rotate-180" /> : null}
          </motion.button>
        </motion.div>
      )}

      {currentStep === "confirmation" && (
        <motion.div
          className="w-full max-w-md flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%404x-igHwrnmhF1mji1zqZmotGGkICWxZh5.png"
                alt="Emergency Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div
              className="text-xl font-bold text-[rgba(255,22,22,1)] tracking-wider mt-3"
              style={{ letterSpacing: "0.05em" }}
            >
              {t.onTheWay}
            </div>
          </div>

          <motion.button
            onClick={() => router.push("/homepage")}
            className="mt-8 bg-[rgba(255,22,22,1)] text-white py-3 px-6 rounded-lg tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ letterSpacing: "0.05em" }}
          >
            {t.returnHome}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
