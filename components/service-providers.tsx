"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ArrowRight, Mail, Star, MapPin, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type ServiceCategory = "medical" | "elderly" | "physical" | "emergency" | null

interface ServiceProvidersProps {
  category: ServiceCategory
  onBack: () => void
}

interface Provider {
  id: number
  name: string
  nameEn: string
  specialty: string
  specialtyEn: string
  phone: string
  email: string
  image: string
  address?: string
  addressEn?: string
  rating?: number
  experience?: string
  experienceEn?: string
  availability?: string
  availabilityEn?: string
  price?: string
  priceEn?: string
}

const mockProviders: Record<string, Provider[]> = {
  medical: [
    {
      id: 1,
      name: "د. سارة الأحمد",
      nameEn: "Dr. Sarah Al-Ahmad",
      specialty: "طب عام",
      specialtyEn: "General Medicine",
      phone: "+966 55 123 4567",
      email: "sarah.alahmad@example.com",
      image: "/images/doctor-female.png",
      address: "الرياض، حي النزهة",
      addressEn: "Riyadh, Al-Nuzha District",
      rating: 4.8,
      experience: "10 سنوات",
      experienceEn: "10 years",
      availability: "متاح يومياً من 9 صباحاً - 9 مساءً",
      availabilityEn: "Available daily from 9 AM - 9 PM",
      price: "300 ريال للزيارة",
      priceEn: "300 SAR per visit",
    },
    {
      id: 2,
      name: "د. محمد العتيبي",
      nameEn: "Dr. Mohammed Al-Otaibi",
      specialty: "أمراض قلب",
      specialtyEn: "Cardiology",
      phone: "+966 55 234 5678",
      email: "mohammed.alotaibi@example.com",
      image: "/images/doctor-male.png",
      address: "الرياض، حي الملقا",
      addressEn: "Riyadh, Al-Malqa District",
      rating: 4.9,
      experience: "15 سنة",
      experienceEn: "15 years",
      availability: "متاح السبت-الخميس من 4 عصراً - 10 مساءً",
      availabilityEn: "Available Sat-Thu from 4 PM - 10 PM",
      price: "500 ريال للزيارة",
      priceEn: "500 SAR per visit",
    },
    {
      id: 3,
      name: "د. نورة القحطاني",
      nameEn: "Dr. Noura Al-Qahtani",
      specialty: "طب أطفال",
      specialtyEn: "Pediatrics",
      phone: "+966 55 345 6789",
      email: "noura.alqahtani@example.com",
      image: "/images/doctor-female.png",
      address: "الرياض، حي الياسمين",
      addressEn: "Riyadh, Al-Yasmin District",
      rating: 4.7,
      experience: "8 سنوات",
      experienceEn: "8 years",
      availability: "متاح يومياً من 10 صباحاً - 8 مساءً",
      availabilityEn: "Available daily from 10 AM - 8 PM",
      price: "350 ريال للزيارة",
      priceEn: "350 SAR per visit",
    },
  ],
  elderly: [
    {
      id: 1,
      name: "أحمد السالم",
      nameEn: "Ahmed Al-Salem",
      specialty: "خدمات رعاية منزلية شاملة لكبار السن",
      specialtyEn: "Comprehensive home care services for the elderly",
      phone: "+966 55 456 7890",
      email: "ahmed@elderlyhomecare.com",
      image: "/images/caregiver-male.png",
      address: "الرياض، حي الورود",
      addressEn: "Riyadh, Al-Wurud District",
      rating: 4.6,
      experience: "12 سنة في مجال الرعاية",
      experienceEn: "12 years in caregiving",
      availability: "خدمة على مدار 24 ساعة",
      availabilityEn: "24-hour service",
      price: "من 150 ريال للساعة",
      priceEn: "From 150 SAR per hour",
    },
    {
      id: 2,
      name: "فاطمة الزهراني",
      nameEn: "Fatima Al-Zahrani",
      specialty: "رعاية طبية متخصصة لكبار السن",
      specialtyEn: "Specialized medical care for the elderly",
      phone: "+966 55 567 8901",
      email: "fatima@darrahah.com",
      image: "/images/caregiver-female.png",
      address: "الرياض، حي العليا",
      addressEn: "Riyadh, Al-Olaya District",
      rating: 4.5,
      experience: "10 سنوات في الرعاية الصحية",
      experienceEn: "10 years in healthcare",
      availability: "خدمة على مدار الساعة، 7 أيام في الأسبوع",
      availabilityEn: "24/7 service, 7 days a week",
      price: "من 180 ريال للساعة",
      priceEn: "From 180 SAR per hour",
    },
    {
      id: 3,
      name: "خالد المالكي",
      nameEn: "Khalid Al-Malki",
      specialty: "رعاية منزلية متكاملة وخدمات تمريضية",
      specialtyEn: "Comprehensive home care and nursing services",
      phone: "+966 55 678 9012",
      email: "khalid@goldencare.com",
      image: "/images/caregiver-male.png",
      address: "الرياض، حي الربوة",
      addressEn: "Riyadh, Al-Rabwah District",
      rating: 4.7,
      experience: "15 سنة في مجال الرعاية الصحية",
      experienceEn: "15 years in healthcare",
      availability: "متاح على مدار الساعة",
      availabilityEn: "Available 24/7",
      price: "من 200 ريال للساعة",
      priceEn: "From 200 SAR per hour",
    },
  ],
  physical: [
    {
      id: 1,
      name: "عبدالله الشمري",
      nameEn: "Abdullah Al-Shammari",
      specialty: "علاج طبيعي شامل في المنزل",
      specialtyEn: "Comprehensive physical therapy at home",
      phone: "+966 55 789 0123",
      email: "abdullah@homept.com",
      image: "/images/therapist-male.png",
      address: "الرياض، حي الملز",
      addressEn: "Riyadh, Al-Malaz District",
      rating: 4.8,
      experience: "9 سنوات في العلاج الطبيعي",
      experienceEn: "9 years in physical therapy",
      availability: "متاح يومياً من 8 صباحاً - 10 مساءً",
      availabilityEn: "Available daily from 8 AM - 10 PM",
      price: "250 ريال للجلسة",
      priceEn: "250 SAR per session",
    },
    {
      id: 2,
      name: "ليلى العنزي",
      nameEn: "Layla Al-Anazi",
      specialty: "إعادة تأهيل وعلاج طبيعي متنقل",
      specialtyEn: "Mobile rehabilitation and physical therapy",
      phone: "+966 55 890 1234",
      email: "layla@recoveryrehab.com",
      image: "/images/therapist-male.png",
      address: "الرياض، حي السليمانية",
      addressEn: "Riyadh, Al-Sulaimaniyah District",
      rating: 4.9,
      experience: "12 سنة في العلاج الطبيعي وإعادة التأهيل",
      experienceEn: "12 years in physical therapy and rehabilitation",
      availability: "متاح السبت-الخميس من 9 صباحاً - 9 مساءً",
      availabilityEn: "Available Sat-Thu from 9 AM - 9 PM",
      price: "300 ريال للجلسة",
      priceEn: "300 SAR per session",
    },
    {
      id: 3,
      name: "يوسف الحربي",
      nameEn: "Yousef Al-Harbi",
      specialty: "علاج طبيعي متخصص وتمارين إعادة تأهيل",
      specialtyEn: "Specialized physical therapy and rehabilitation exercises",
      phone: "+966 55 901 2345",
      email: "yousef@alafia-pt.com",
      image: "/images/therapist-male.png",
      address: "الرياض، حي الروضة",
      addressEn: "Riyadh, Al-Rawdah District",
      rating: 4.7,
      experience: "10 سنوات في العلاج الطبيعي",
      experienceEn: "10 years in physical therapy",
      availability: "متاح يومياً من 10 صباحاً - 8 مساءً",
      availabilityEn: "Available daily from 10 AM - 8 PM",
      price: "280 ريال للجلسة",
      priceEn: "280 SAR per session",
    },
  ],
  emergency: [
    {
      id: 1,
      name: "فريق الاستجابة السريعة",
      nameEn: "Rapid Response Team",
      specialty: "خدمات طوارئ طبية على مدار 24 ساعة",
      specialtyEn: "24-hour medical emergency services",
      phone: "+966 55 911 0000",
      email: "dispatch@rapidresponse.com",
      image: "/images/emergency-staff.png",
      address: "الرياض، متنقل في جميع الأحياء",
      addressEn: "Riyadh, mobile in all districts",
      rating: 4.9,
      experience: "فريق طبي متخصص بخبرة 15 سنة",
      experienceEn: "Specialized medical team with 15 years of experience",
      availability: "متاح 24/7",
      availabilityEn: "Available 24/7",
      price: "من 500 ريال للحالة الطارئة",
      priceEn: "From 500 SAR per emergency case",
    },
    {
      id: 2,
      name: "خدمات الإسعاف المتنقلة",
      nameEn: "Mobile Ambulance Services",
      specialty: "نقل طبي طارئ ورعاية متنقلة",
      specialtyEn: "Emergency medical transport and mobile care",
      phone: "+966 55 911 1111",
      email: "emergency@ambulanceservices.com",
      image: "/images/emergency-staff.png",
      address: "الرياض، تغطية شاملة",
      addressEn: "Riyadh, comprehensive coverage",
      rating: 4.8,
      experience: "فريق مسعفين معتمدين بخبرة 10 سنوات",
      experienceEn: "Team of certified paramedics with 10 years of experience",
      availability: "خدمة على مدار الساعة",
      availabilityEn: "24-hour service",
      price: "من 600 ريال للنقل الطارئ",
      priceEn: "From 600 SAR for emergency transport",
    },
  ],
}

const categoryTitles: Record<string, { ar: string; en: string }> = {
  medical: { ar: "زيارات الطبيب المنزلية", en: "Doctor Home Visits" },
  elderly: { ar: "خدمات رعاية كبار السن", en: "Elderly Care Services" },
  physical: { ar: "العلاج الطبيعي في المنزل", en: "Home Physical Therapy" },
  emergency: { ar: "خدمات الطوارئ", en: "Emergency Services" },
}

const categoryImages: Record<string, string> = {
  medical: "/images/home-care-logo.png",
  elderly: "/images/elderly-care-logo.png",
  physical: "/images/physical-therapy-logo.png",
  emergency: "/images/emergency-logo.png",
}

const translations = {
  ar: {
    back: "العودة",
    experience: "الخبرة:",
    availability: "الأوقات المتاحة:",
    call: "اتصال",
    changeLanguage: "English",
  },
  en: {
    back: "Back",
    experience: "Experience:",
    availability: "Available Times:",
    call: "Call",
    changeLanguage: "العربية",
  },
}

export default function ServiceProviders({ category, onBack }: ServiceProvidersProps) {
  const providers = category ? mockProviders[category] : []
  const { language, toggleLanguage } = useLanguage()
  const isArabic = language === "ar"
  const t = translations[language as keyof typeof translations]

  const title = category ? (isArabic ? categoryTitles[category].ar : categoryTitles[category].en) : ""
  const categoryImage = category ? categoryImages[category] : ""

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
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

      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="ml-2">
          <ArrowRight className="h-5 w-5" />
          <span className="mr-2">{t.back}</span>
        </Button>
        <div className="flex items-center">
          <div className="relative w-10 h-10 ml-2 bg-[rgba(255,22,22,1)] rounded-full flex items-center justify-center">
            <Image
              src={categoryImage || "/placeholder.svg"}
              alt={title}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold mr-2">{title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full relative border-[rgba(255,22,22,1)] border">
              <div className="relative h-48 bg-[rgba(255,22,22,0.1)] flex items-center justify-center">
                <Image
                  src={provider.image || "/placeholder.svg"}
                  alt={isArabic ? provider.name : provider.nameEn}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-1 text-[rgba(255,22,22,1)]">
                  {isArabic ? provider.name : provider.nameEn}
                </h2>
                <p className="text-gray-600 mb-4">{isArabic ? provider.specialty : provider.specialtyEn}</p>

                {provider.rating && (
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                    <span className="text-sm text-gray-600">{provider.rating}</span>

                    {provider.experience && (
                      <div className="mr-4 text-sm text-gray-600">
                        <span className="font-medium">{t.experience}</span>{" "}
                        {isArabic ? provider.experience : provider.experienceEn}
                      </div>
                    )}
                  </div>
                )}

                {provider.address && (
                  <div className="flex items-center mb-3">
                    <MapPin className="h-4 w-4 text-gray-500 ml-2" />
                    <p className="text-sm text-gray-600">{isArabic ? provider.address : provider.addressEn}</p>
                  </div>
                )}

                {provider.availability && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t.availability}</span>{" "}
                      {isArabic ? provider.availability : provider.availabilityEn}
                    </p>
                  </div>
                )}

                {provider.price && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[rgba(255,22,22,1)]">
                      {isArabic ? provider.price : provider.priceEn}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[rgba(255,22,22,1)] ml-3" />
                    <p>{provider.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[rgba(255,22,22,1)] ml-3" />
                    <p>{provider.email}</p>
                  </div>
                </div>

                <Button
                  className="absolute bottom-4 left-4 bg-[rgba(255,22,22,1)] hover:bg-[rgba(220,20,20,1)] gap-3"
                  onClick={() => (window.location.href = `tel:${provider.phone.replace(/\D/g, "")}`)}
                >
                  <Phone className="h-4 w-4" />
                  {t.call}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
