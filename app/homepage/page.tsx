"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, MessageCircle } from "lucide-react"

export default function Homepage() {
  const router = useRouter()

  const handleEmergency = () => {
    router.push("/emergency-form")
  }

  return (
    <div className="min-h-screen bg-gray-100 rtl">
      <header className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[rgba(255,22,22,1)]">طوارئ</div>
          <button onClick={handleEmergency} className="bg-[rgba(255,22,22,1)] text-white py-2 px-4 rounded-lg">
            طوارئ
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">خدمات طبية منزلية</h2>
                <div className="bg-[rgba(255,22,22,1)] text-white py-1 px-4 rounded-full text-sm">
                  خدمات طبية منزلية
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4 text-right">:الخدمات المتاحة</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                  <div className="relative w-full h-40 bg-[rgba(255,22,22,1)] rounded-lg flex items-center justify-center mb-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%207.13.55%20PM-d8aElTtiE3XDHd8tLABzXK3tZT6Nhj.jpeg"
                      alt="Home Services"
                      width={300}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center">زيارات الطبيب المنزلية</span>
                </motion.div>

                <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                  <div className="relative w-full h-40 bg-[rgba(255,22,22,1)] rounded-lg flex items-center justify-center mb-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%207.13.55%20PM-d8aElTtiE3XDHd8tLABzXK3tZT6Nhj.jpeg"
                      alt="Home Services"
                      width={300}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center">العلاج الطبيعي في المنزل</span>
                </motion.div>

                <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                  <div className="relative w-full h-40 bg-[rgba(255,22,22,1)] rounded-lg flex items-center justify-center mb-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%207.13.55%20PM-d8aElTtiE3XDHd8tLABzXK3tZT6Nhj.jpeg"
                      alt="Home Services"
                      width={300}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center">رعاية كبار السن</span>
                </motion.div>
              </div>

              <div className="bg-[rgba(255,22,22,1)] text-white p-4 rounded-lg mb-6">
                <p className="text-center">
                  نوفر لك أفضل الخدمات الطبية في راحة منزلك عبر فريق طبي متخصص ومدرب على أعلى مستوى، يحرص على راحتك
                  وسلامتك دون الحاجة لزيارة المستشفيات أو العيادات
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-medium mb-2 text-right">:احجز الخدمة الآن</h3>
                <div className="flex items-center justify-end">
                  <span className="ml-2">00000:اتصل بنا</span>
                  <Phone className="h-5 w-5 text-[rgba(255,22,22,1)]" />
                </div>
                <div className="flex items-center justify-end">
                  <span className="ml-2">000000 :واتساب</span>
                  <MessageCircle className="h-5 w-5 text-[rgba(255,22,22,1)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%207.13.55%20PM%20%282%29-Fv9h4Hn5ktsP99ZSrfhts1DawaIqZ6.jpeg"
                alt="Ambulance"
                width={150}
                height={150}
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
