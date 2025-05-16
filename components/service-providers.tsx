"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ArrowRight, Mail, Star, MapPin } from "lucide-react"

type ServiceCategory = "medical" | "elderly" | "physical" | "emergency" | null

interface ServiceProvidersProps {
  category: ServiceCategory
  onBack: () => void
}

interface Provider {
  id: number
  name: string
  specialty: string
  phone: string
  email: string
  image: string
  address?: string
  rating?: number
  experience?: string
  availability?: string
  price?: string
}

const mockProviders: Record<string, Provider[]> = {
  medical: [
    {
      id: 1,
      name: "د. سارة الأحمد",
      specialty: "طب عام",
      phone: "+966 55 123 4567",
      email: "sarah.alahmad@example.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي النزهة",
      rating: 4.8,
      experience: "10 سنوات",
      availability: "متاح يومياً من 9 صباحاً - 9 مساءً",
      price: "300 ريال للزيارة",
    },
    {
      id: 2,
      name: "د. محمد العتيبي",
      specialty: "أمراض قلب",
      phone: "+966 55 234 5678",
      email: "mohammed.alotaibi@example.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي الملقا",
      rating: 4.9,
      experience: "15 سنة",
      availability: "متاح السبت-الخميس من 4 عصراً - 10 مساءً",
      price: "500 ريال للزيارة",
    },
    {
      id: 3,
      name: "د. نورة القحطاني",
      specialty: "طب أطفال",
      phone: "+966 55 345 6789",
      email: "noura.alqahtani@example.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي الياسمين",
      rating: 4.7,
      experience: "8 سنوات",
      availability: "متاح يومياً من 10 صباحاً - 8 مساءً",
      price: "350 ريال للزيارة",
    },
  ],
  elderly: [
    {
      id: 1,
      name: "رعاية المسنين المنزلية",
      specialty: "خدمات رعاية منزلية شاملة لكبار السن",
      phone: "+966 55 456 7890",
      email: "care@elderlyhomecare.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي الورود",
      rating: 4.6,
      experience: "12 سنة في مجال الرعاية",
      availability: "خدمة على مدار 24 ساعة",
      price: "من 150 ريال للساعة",
    },
    {
      id: 2,
      name: "دار الراحة للرعاية المنزلية",
      specialty: "رعاية طبية متخصصة لكبار السن",
      phone: "+966 55 567 8901",
      email: "info@darrahah.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي العليا",
      rating: 4.5,
      experience: "10 سنوات في الرعاية الصحية",
      availability: "خدمة على مدار الساعة، 7 أيام في الأسبوع",
      price: "من 180 ريال للساعة",
    },
    {
      id: 3,
      name: "الرعاية الذهبية",
      specialty: "رعاية منزلية متكاملة وخدمات تمريضية",
      phone: "+966 55 678 9012",
      email: "contact@goldencare.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي الربوة",
      rating: 4.7,
      experience: "15 سنة في مجال الرعاية الصحية",
      availability: "متاح على مدار الساعة",
      price: "من 200 ريال للساعة",
    },
  ],
  physical: [
    {
      id: 1,
      name: "العلاج الطبيعي المنزلي",
      specialty: "علاج طبيعي شامل في المنزل",
      phone: "+966 55 789 0123",
      email: "appointments@homept.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي الملز",
      rating: 4.8,
      experience: "9 سنوات في العلاج الطبيعي",
      availability: "متاح يومياً من 8 صباحاً - 10 مساءً",
      price: "250 ريال للجلسة",
    },
    {
      id: 2,
      name: "مركز التعافي للعلاج الطبيعي",
      specialty: "إعادة تأهيل وعلاج طبيعي متنقل",
      phone: "+966 55 890 1234",
      email: "care@recoveryrehab.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي السليمانية",
      rating: 4.9,
      experience: "12 سنة في العلاج الطبيعي وإعادة التأهيل",
      availability: "متاح السبت-الخميس من 9 صباحاً - 9 مساءً",
      price: "300 ريال للجلسة",
    },
    {
      id: 3,
      name: "العافية للعلاج الطبيعي",
      specialty: "علاج طبيعي متخصص وتمارين إعادة تأهيل",
      phone: "+966 55 901 2345",
      email: "info@alafia-pt.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، حي الروضة",
      rating: 4.7,
      experience: "10 سنوات في العلاج الطبيعي",
      availability: "متاح يومياً من 10 صباحاً - 8 مساءً",
      price: "280 ريال للجلسة",
    },
  ],
  emergency: [
    {
      id: 1,
      name: "الاستجابة السريعة للطوارئ",
      specialty: "خدمات طوارئ طبية على مدار 24 ساعة",
      phone: "+966 55 911 0000",
      email: "dispatch@rapidresponse.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، متنقل في جميع الأحياء",
      rating: 4.9,
      experience: "فريق طبي متخصص بخبرة 15 سنة",
      availability: "متاح 24/7",
      price: "من 500 ريال للحالة الطارئة",
    },
    {
      id: 2,
      name: "خدمات الإسعاف المتنقلة",
      specialty: "نقل طبي طارئ ورعاية متنقلة",
      phone: "+966 55 911 1111",
      email: "emergency@ambulanceservices.com",
      image: "/placeholder.svg?height=200&width=200",
      address: "الرياض، تغطية شاملة",
      rating: 4.8,
      experience: "فريق مسعفين معتمدين بخبرة 10 سنوات",
      availability: "خدمة على مدار الساعة",
      price: "من 600 ريال للنقل الطارئ",
    },
  ],
}

const categoryTitles: Record<string, string> = {
  medical: "زيارات الطبيب المنزلية",
  elderly: "خدمات رعاية كبار السن",
  physical: "العلاج الطبيعي في المنزل",
  emergency: "خدمات الطوارئ",
}

const categoryImages: Record<string, string> = {
  medical:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2011.18.00%20PM-PHjrDZ17qi1GhdGhphkmaxcJzJOTvo.jpeg",
  elderly:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2011.16.18%20PM-U1AYeoxJqAxyTZiBiEdZeSKSPf2hCb.jpeg",
  physical:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2011.19.31%20PM-9geAIEv5UnbysFExSpZ1ktbVMjVLFk.jpeg",
  emergency:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%404x-igHwrnmhF1mji1zqZmotGGkICWxZh5.png",
}

export default function ServiceProviders({ category, onBack }: ServiceProvidersProps) {
  const providers = category ? mockProviders[category] : []
  const title = category ? categoryTitles[category] : ""
  const categoryImage = category ? categoryImages[category] : ""

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="ml-2">
          <ArrowRight className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <div className="relative w-10 h-10 ml-2 bg-[rgba(255,22,22,1)] rounded-full flex items-center justify-center">
            <Image
              src={categoryImage || "/placeholder.svg"}
              alt={title}
              width={24}
              height={24}
              className="object-contain filter invert"
            />
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
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
                  alt={provider.name}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-1 text-[rgba(255,22,22,1)]">{provider.name}</h2>
                <p className="text-gray-600 mb-4">{provider.specialty}</p>

                {provider.rating && (
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                    <span className="text-sm text-gray-600">{provider.rating}</span>

                    {provider.experience && (
                      <div className="mr-4 text-sm text-gray-600">
                        <span className="font-medium">الخبرة:</span> {provider.experience}
                      </div>
                    )}
                  </div>
                )}

                {provider.address && (
                  <div className="flex items-center mb-3">
                    <MapPin className="h-4 w-4 text-gray-500 ml-2" />
                    <p className="text-sm text-gray-600">{provider.address}</p>
                  </div>
                )}

                {provider.availability && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">الأوقات المتاحة:</span> {provider.availability}
                    </p>
                  </div>
                )}

                {provider.price && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[rgba(255,22,22,1)]">{provider.price}</p>
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
                  className="absolute bottom-4 left-4 bg-[rgba(255,22,22,1)] hover:bg-[rgba(220,20,20,1)]"
                  onClick={() => (window.location.href = `tel:${provider.phone.replace(/\D/g, "")}`)}
                >
                  <Phone className="h-4 w-4 ml-2" />
                  اتصال
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
