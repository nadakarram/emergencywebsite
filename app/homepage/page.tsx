"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, MessageCircle } from "lucide-react"
import ServiceProviders from "@/components/service-providers"

type ServiceCategory = "medical" | "elderly" | "physical" | "emergency" | null

interface ServiceCard {
  id: string
  title: string
  category: ServiceCategory
  imageUrl: string
  description: string
}

export default function Homepage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(null)

  const handleEmergency = () => {
    router.push("/emergency-form")
  }

  const serviceCards: ServiceCard[] = [
    {
      id: "medical",
      title: "زيارات الطبيب المنزلية",
      category: "medical",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2011.18.00%20PM-PHjrDZ17qi1GhdGhphkmaxcJzJOTvo.jpeg",
      description: "خدمة زيارات الأطباء المنزلية لتوفير الرعاية الطبية في راحة منزلك",
    },
    {
      id: "elderly",
      title: "رعاية كبار السن",
      category: "elderly",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2011.16.18%20PM-U1AYeoxJqAxyTZiBiEdZeSKSPf2hCb.jpeg",
      description: "خدمات متخصصة لرعاية كبار السن وتوفير الاحتياجات الخاصة بهم",
    },
    {
      id: "physical",
      title: "العلاج الطبيعي في المنزل",
      category: "physical",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2011.19.31%20PM-9geAIEv5UnbysFExSpZ1ktbVMjVLFk.jpeg",
      description: "جلسات علاج طبيعي متخصصة في منزلك لتسريع التعافي وتحسين الحركة",
    },
  ]

  if (selectedCategory) {
    return <ServiceProviders category={selectedCategory} onBack={() => setSelectedCategory(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4 pt-20">
        <section className="mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">خدمات طبية منزلية</h2>
                <div className="bg-[rgba(255,22,22,1)] text-white py-1 px-4 rounded-full text-sm">
                  خدمات طبية منزلية
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">الخدمات المتاحة:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {serviceCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className="bg-[rgba(255,22,22,1)] rounded-lg shadow-md overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedCategory(card.category)}
                  >
                    <div className="p-6 flex justify-center">
                      <div className="relative w-32 h-32">
                        <Image
                          src={card.imageUrl || "/placeholder.svg"}
                          alt={card.title}
                          fill
                          className="object-contain filter invert"
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-bold text-center mb-2 text-[rgba(255,22,22,1)]">{card.title}</h3>
                      <p className="text-gray-600 text-sm text-center">{card.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[rgba(255,22,22,1)] text-white p-4 rounded-lg mb-6">
                <p className="text-center">
                  نوفر لك أفضل الخدمات الطبية في راحة منزلك عبر فريق طبي متخصص ومدرب على أعلى مستوى، يحرص على راحتك
                  وسلامتك دون الحاجة لزيارة المستشفيات أو العيادات
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-medium mb-2">احجز الخدمة الآن:</h3>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[rgba(255,22,22,1)] ml-2" />
                  <span>اتصل بنا: 00000</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-[rgba(255,22,22,1)] ml-2" />
                  <span>واتساب: 000000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%404x-igHwrnmhF1mji1zqZmotGGkICWxZh5.png"
                alt="Emergency Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-4">نحن في الطريق</h2>
            <button onClick={handleEmergency} className="w-full bg-[rgba(255,22,22,1)] text-white py-3 rounded-lg">
              طلب إسعاف
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
