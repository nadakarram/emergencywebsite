"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Plus, Globe } from "lucide-react"
import { getRequiredServices } from "@/utils/condition-service-mapping"

type Language = "ar" | "en"

// Translations for the emergency form
const translations = {
  ar: {
    emergency: "طوارئ",
    skip: "تخطي",
    whatIsEmergency: "ما هي الحالة الطارئة ؟",
    commonConditions: "الامراض الاكثر شيوعا",
    addAnother: "إضافة حالة أخرى",
    add: "إضافة",
    enterCondition: "أدخل الحالة الطارئة",
    done: "تم",
    recommendedServices: "الخدمات الطبية المطلوبة:",
  },
  en: {
    emergency: "Emergency",
    skip: "Skip",
    whatIsEmergency: "What is the emergency condition?",
    commonConditions: "Common conditions",
    addAnother: "Add another condition",
    add: "Add",
    enterCondition: "Enter emergency condition",
    done: "Done",
    recommendedServices: "Required medical services:",
  },
}

// Bilingual condition data
const commonConditions = [
  { id: 1, ar: "إغماء", en: "Fainting" },
  { id: 2, ar: "حرق", en: "Burns" },
  { id: 3, ar: "حادث طريق", en: "Road Accident" },
  { id: 4, ar: "ألم في القلب", en: "Heart Pain" },
  { id: 5, ar: "صعوبة التنفس", en: "Breathing Difficulty" },
  { id: 6, ar: "تم", en: "Done" },
]

export default function EmergencyForm() {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [customConditions, setCustomConditions] = useState<{ id: number; ar: string; en: string }[]>([])
  const [newCondition, setNewCondition] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [language, setLanguage] = useState<Language>("ar")
  const [requiredServices, setRequiredServices] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const t = translations[language]
  const isArabic = language === "ar"

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  const getConditionName = (condition: { ar: string; en: string }) => {
    return language === "ar" ? condition.ar : condition.en
  }

  // Update required services when conditions change
  useEffect(() => {
    if (selectedConditions.length === 0) {
      setRequiredServices([])
      return
    }

    const allServices = new Set<string>()

    selectedConditions.forEach((conditionName) => {
      // Find if it's a predefined condition
      const predefinedCondition = commonConditions.find(
        (c) => getConditionName(c) === conditionName && c.id !== 6, // Exclude "Done" button
      )

      // Find if it's a custom condition
      const customCondition = customConditions.find((c) => getConditionName(c) === conditionName)

      // Get the Arabic name of the condition for service mapping
      let conditionForMapping = ""

      if (predefinedCondition) {
        conditionForMapping = predefinedCondition.ar
      } else if (customCondition) {
        conditionForMapping = customCondition.ar || customCondition.en
      } else {
        conditionForMapping = conditionName
      }

      // Get required services for this condition
      const services = getRequiredServices(conditionForMapping)
      services.forEach((service) => allServices.add(service))
    })

    setRequiredServices(Array.from(allServices))
  }, [selectedConditions, customConditions, language])

  const handleConditionToggle = (conditionName: string) => {
    if (selectedConditions.includes(conditionName)) {
      setSelectedConditions(selectedConditions.filter((name) => name !== conditionName))
    } else {
      setSelectedConditions([...selectedConditions, conditionName])
    }
  }

  const handleAddCustomCondition = () => {
    if (newCondition.trim()) {
      const newCustomCondition = {
        id: Date.now(),
        ar: isArabic ? newCondition.trim() : "",
        en: !isArabic ? newCondition.trim() : "",
      }
      setCustomConditions([...customConditions, newCustomCondition])

      // Automatically select the new condition
      setSelectedConditions([...selectedConditions, newCondition.trim()])

      setNewCondition("")
      setShowAddForm(false)
    }
  }

  const handleShowAddForm = () => {
    setShowAddForm(true)
    // Focus the input field after the form is shown
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const handleNext = () => {
    if (selectedConditions.length > 0) {
      // Store selected conditions in the current language
      const selectedConditionsData = selectedConditions.map((condName) => {
        // Find in predefined conditions
        const predefined = commonConditions.find((c) => getConditionName(c) === condName)

        if (predefined) {
          return { ar: predefined.ar, en: predefined.en }
        }

        // Find in custom conditions
        const custom = customConditions.find((c) => getConditionName(c) === condName)

        if (custom) {
          return { ar: custom.ar, en: custom.en }
        }

        // Fallback
        return { ar: condName, en: condName }
      })

      // Store the required services for these conditions
      localStorage.setItem("emergencyConditions", JSON.stringify(selectedConditionsData))
      localStorage.setItem("requiredServices", JSON.stringify(requiredServices))

      router.push("/assessment")
    }
  }

  const handleSkip = () => {
    router.push("/homepage")
  }

  // Translate service names
  const translateService = (service: string) => {
    const serviceTranslations: Record<string, string> = {
      طوارئ: "Emergency",
      باطنة: "Internal Medicine",
      أعصاب: "Neurology",
      جراحة: "Surgery",
      جلدية: "Dermatology",
      عظام: "Orthopedics",
      "عناية مركزة": "ICU",
      قلب: "Cardiology",
      صدر: "Pulmonology",
      "أذن وأنف وحنجرة": "ENT",
      روماتيزم: "Rheumatology",
    }

    return isArabic ? service : serviceTranslations[service] || service
  }

  return (
    <div className={`min-h-screen bg-white flex flex-col items-center p-6 ${isArabic ? "rtl" : "ltr"}`}>
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

      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <motion.button
          onClick={handleSkip}
          className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 flex items-center hover:bg-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isArabic ? <ArrowRight className="h-4 w-4 ml-1" /> : null}
          <span className="tracking-wider">{t.skip}</span>
          {!isArabic ? <ArrowRight className="h-4 w-4 mr-1 rotate-180" /> : null}
        </motion.button>

        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[rgba(255,22,22,1)]">{t.emergency}</div>
        </div>
      </div>

      <motion.div
        className="w-full max-w-md mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-200 rounded-full py-3 px-6 mb-8 text-right">
          <h1
            className="text-xl font-medium text-[#333] text-center tracking-wider"
            style={{ letterSpacing: "0.05em" }}
          >
            {isArabic ? (
              <>
                ما هي الحالة <span className="text-[rgba(255,22,22,1)] font-bold">الطارئة</span> ؟
              </>
            ) : (
              <>
                What is the <span className="text-[rgba(255,22,22,1)] font-bold">emergency</span> condition?
              </>
            )}
          </h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4 text-right tracking-wider" style={{ letterSpacing: "0.05em" }}>
            {t.commonConditions}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {commonConditions.slice(0, 2).map((condition) => (
              <motion.button
                key={condition.id}
                onClick={() => handleConditionToggle(getConditionName(condition))}
                className={`py-3 px-4 rounded-full border border-[rgba(255,22,22,1)] text-center transition-colors tracking-wider ${
                  selectedConditions.includes(getConditionName(condition))
                    ? "bg-[rgba(255,22,22,1)] text-white"
                    : "bg-white text-[rgba(255,22,22,1)]"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{ letterSpacing: "0.05em" }}
              >
                {getConditionName(condition)}
              </motion.button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            {commonConditions.slice(2, 5).map((condition) => (
              <motion.button
                key={condition.id}
                onClick={() => handleConditionToggle(getConditionName(condition))}
                className={`py-3 px-4 rounded-full border border-[rgba(255,22,22,1)] text-center transition-colors tracking-wider ${
                  selectedConditions.includes(getConditionName(condition))
                    ? "bg-[rgba(255,22,22,1)] text-white"
                    : "bg-white text-[rgba(255,22,22,1)]"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{ letterSpacing: "0.05em" }}
              >
                {getConditionName(condition)}
              </motion.button>
            ))}
          </div>

          {/* Custom conditions */}
          {customConditions.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mb-4">
              {customConditions.map((condition) => (
                <motion.button
                  key={condition.id}
                  onClick={() => handleConditionToggle(getConditionName(condition))}
                  className={`py-3 px-4 rounded-full border border-[rgba(255,22,22,1)] text-center transition-colors tracking-wider ${
                    selectedConditions.includes(getConditionName(condition))
                      ? "bg-[rgba(255,22,22,1)] text-white"
                      : "bg-white text-[rgba(255,22,22,1)]"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ letterSpacing: "0.05em" }}
                >
                  {getConditionName(condition)}
                </motion.button>
              ))}
            </div>
          )}

          {/* Required services based on selected conditions */}
          {requiredServices.length > 0 && (
            <div className="mt-6 mb-4 bg-gray-50 p-4 rounded-lg text-right">
              <h3 className="font-medium mb-2">{t.recommendedServices}</h3>
              <div className="flex flex-wrap gap-2">
                {requiredServices.map((service, index) => (
                  <span
                    key={index}
                    className="bg-[rgba(255,22,22,0.1)] text-[rgba(255,22,22,1)] px-3 py-1 rounded-full text-sm"
                  >
                    {translateService(service)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add custom condition form */}
          {showAddForm ? (
            <div className="mt-4 mb-4">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder={t.enterCondition}
                  className="flex-1 py-2 px-4 bg-[rgba(255,22,22,1)] text-white border border-[rgba(255,22,22,1)] rounded-r-full focus:outline-none placeholder-white tracking-wider"
                  style={{ letterSpacing: "0.05em" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddCustomCondition()
                    }
                  }}
                />
                <button
                  onClick={handleAddCustomCondition}
                  className="py-2 px-4 bg-[rgba(255,22,22,1)] text-white rounded-l-full tracking-wider"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {t.add}
                </button>
              </div>
            </div>
          ) : (
            <motion.button
              onClick={handleShowAddForm}
              className="py-3 px-4 rounded-full border border-gray-300 bg-white text-gray-700 text-center w-full mb-4 flex items-center justify-center tracking-wider"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ letterSpacing: "0.05em" }}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t.addAnother}
            </motion.button>
          )}
        </div>

        <motion.button
          onClick={handleNext}
          className="py-3 px-6 rounded-full border border-gray-300 bg-gray-200 text-[rgba(255,22,22,1)] text-center w-40 mx-auto block tracking-wider"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ letterSpacing: "0.05em" }}
        >
          {getConditionName(commonConditions[5])}
        </motion.button>
      </motion.div>
    </div>
  )
}
