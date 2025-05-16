"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, MessageCircle, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type ServiceCategory = "emergency" | null

interface ServiceCard {
  id: string
  title: string
  titleEn: string
  route: string
  imageUrl: string
  description: string
  descriptionEn: string
}

const translations = {
  ar: {
    availableServices: "الخدمات المتاحة:",
    medicalServices: "خدمات طبية منزلية",
    bookNow: "احجز الخدمة الآن:",
    callUs: "اتصل بنا:",
    whatsapp: "واتساب:",
    onTheWay: "نحن في الطريق",
    requestAmbulance: "طلب إسعاف",
    changeLanguage: "English",
  },
  en: {
    availableServices: "Available Services:",
    medicalServices: "Home Medical Services",
    bookNow: "Book the service now:",
    callUs: "Call us:",
    whatsapp: "WhatsApp:",
    onTheWay: "We are on the way",
    requestAmbulance: "Request Ambulance",
    changeLanguage: "العربية",
  },
}

export default function Homepage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const isArabic = language === "ar"

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEmergency = () => {
    router.push("/emergency-form")
  }

  const serviceCards: ServiceCard[] = [
    {
      id: "medical",
      title: "زيارات الطبيب المنزلية",
      titleEn: "Doctor Home Visits",
      route: "/doctor-visits",
      imageUrl: "/images/home-care-logo.png",
      description: "خدمة زيارات الأطباء المنزلية لتوفير الرعاية الطبية في راحة منزلك",
      descriptionEn: "Doctor home visit service to provide medical care in the comfort of your home",
    },
    {
      id: "elderly",
      title: "رعاية كبار السن",
      titleEn: "Elderly Care",
      route: "/elderly-care",
      imageUrl: "/images/elderly-care-logo.png",
      description: "خدمات متخصصة لرعاية كبار السن وتوفير الاحتياجات الخاصة بهم",
      descriptionEn: "Specialized services for elderly care and providing their special needs",
    },
    {
      id: "physical",
      title: "العلاج الطبيعي في المنزل",
      titleEn: "Home Physical Therapy",
      route: "/physical-therapy",
      imageUrl: "/images/physical-therapy-logo.png",
      description: "جلسات علاج طبيعي متخصصة في منزلك لتسريع التعافي وتحسين الحركة",
      descriptionEn: "Specialized physical therapy sessions in your home to speed recovery and improve mobility",
    },
  ]

  // If not mounted yet, return a simple loading state to prevent hydration errors
  if (!mounted) {
    return <div className="min-h-screen bg-gray-100"></div>
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${isArabic ? "rtl" : "ltr"}`}>
      <main className="container mx-auto p-4 pt-20">
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

        <section className="mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.medicalServices}</h2>
                <div className="bg-[rgba(255,22,22,1)] text-white py-1 px-4 rounded-full text-sm">
                  {t.medicalServices}
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">{t.availableServices}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {serviceCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className="rounded-lg shadow-md overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => router.push(card.route)}
                  >
                    <div className="flex justify-center items-center bg-[rgba(255,22,22,1)] h-40 p-4">
                      <Image
                        src={card.imageUrl || "/placeholder.svg"}
                        alt={isArabic ? card.title : card.titleEn}
                        width={140}
                        height={140}
                        className="object-contain"
                        style={{ margin: 0, padding: 0 }}
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-bold text-center mb-2 text-[rgba(255,22,22,1)]">
                        {isArabic ? card.title : card.titleEn}
                      </h3>
                      <p className="text-gray-600 text-sm text-center">
                        {isArabic ? card.description : card.descriptionEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[rgba(255,22,22,1)] text-white p-4 rounded-lg mb-6">
                <p className="text-center">
                  {isArabic
                    ? "نوفر لك أفضل الخدمات الطبية في راحة منزلك عبر فريق طبي متخصص ومدرب على أعلى مستوى، يحرص على راحتك وسلامتك دون الحاجة لزيارة المستشفيات أو العيادات"
                    : "We provide you with the best medical services in the comfort of your home through a specialized medical team trained at the highest level, who cares about your comfort and safety without the need to visit hospitals or clinics"}
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-medium mb-2">{t.bookNow}</h3>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[rgba(255,22,22,1)]" />
                  <span>{t.callUs} 00000</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[rgba(255,22,22,1)]" />
                  <span>{t.whatsapp} 000000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/images/emergency-logo.png"
                alt="Emergency Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-4">{t.onTheWay}</h2>
            <button onClick={handleEmergency} className="w-full bg-[rgba(255,22,22,1)] text-white py-3 rounded-lg">
              {t.requestAmbulance}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
