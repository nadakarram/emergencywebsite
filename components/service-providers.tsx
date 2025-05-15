"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ArrowLeft, Mail } from "lucide-react"

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
}

const mockProviders: Record<string, Provider[]> = {
  medical: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@example.com",
      image: "/images/doctor1.png",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@example.com",
      image: "/images/doctor2.png",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@example.com",
      image: "/images/doctor3.png",
    },
  ],
  elderly: [
    {
      id: 1,
      name: "Golden Years Care",
      specialty: "In-home elderly care services",
      phone: "+1 (555) 456-7890",
      email: "contact@goldenyears.com",
      image: "/images/elderly-care1.png",
    },
    {
      id: 2,
      name: "Sunset Comfort",
      specialty: "Specialized elderly medical care",
      phone: "+1 (555) 567-8901",
      email: "info@sunsetcomfort.com",
      image: "/images/elderly-care2.png",
    },
  ],
  physical: [
    {
      id: 1,
      name: "Home Healing PT",
      specialty: "In-home physical therapy",
      phone: "+1 (555) 678-9012",
      email: "appointments@homehealing.com",
      image: "/images/pt1.png",
    },
    {
      id: 2,
      name: "MobileFit Therapy",
      specialty: "Mobile physical rehabilitation",
      phone: "+1 (555) 789-0123",
      email: "care@mobilefit.com",
      image: "/images/pt2.png",
    },
  ],
  emergency: [
    {
      id: 1,
      name: "Rapid Response Medical",
      specialty: "24/7 Emergency medical services",
      phone: "+1 (555) 911-0000",
      email: "dispatch@rapidresponse.com",
      image: "/images/emergency1.png",
    },
    {
      id: 2,
      name: "City Ambulance Services",
      specialty: "Emergency transport and care",
      phone: "+1 (555) 911-1111",
      email: "emergency@cityambulance.com",
      image: "/images/emergency2.png",
    },
  ],
}

const categoryTitles: Record<string, string> = {
  medical: "Medical Services",
  elderly: "Elderly Care Services",
  physical: "Home Physical Therapy",
  emergency: "Emergency Services",
}

export default function ServiceProviders({ category, onBack }: ServiceProvidersProps) {
  const providers = category ? mockProviders[category] : []
  const title = category ? categoryTitles[category] : ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full">
              <div className="relative h-64">
                <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-1">{provider.name}</h2>
                <p className="text-gray-600 mb-4">{provider.specialty}</p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[rgba(255,22,22,1)] mr-3" />
                    <p>{provider.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[rgba(255,22,22,1)] mr-3" />
                    <p>{provider.email}</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Button
                    className="flex-1 bg-[rgba(255,22,22,1)] hover:bg-[rgba(220,20,20,1)]"
                    onClick={() => (window.location.href = `tel:${provider.phone.replace(/\D/g, "")}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => (window.location.href = `mailto:${provider.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
