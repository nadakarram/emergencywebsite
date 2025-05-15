"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin, Phone, Star, CheckCircle, Map } from "lucide-react"
import dynamic from "next/dynamic"
import type { Hospital } from "@/types/hospital"
import { calculateDistance, formatDistance } from "@/utils/distance"
import { hospitalDatabase } from "@/utils/hospitals-data"
import { calculateHospitalMatchScore } from "@/utils/condition-service-mapping"
import { getGoogleMapsUrl } from "@/utils/map-utils"

// Import map component dynamically to avoid SSR issues
const HospitalMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-gray-200 flex items-center justify-center">جاري تحميل الخريطة...</div>
  ),
})

export default function Hospitals() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [locationStatus, setLocationStatus] = useState<"pending" | "granted" | "denied" | "searching">("pending")
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [patientConditions, setPatientConditions] = useState<Array<{ ar: string; en: string }>>([])
  const [requiredServices, setRequiredServices] = useState<string[]>([])
  const router = useRouter()

  // Get patient conditions and required services from localStorage
  useEffect(() => {
    try {
      const storedConditions = localStorage.getItem("emergencyConditions")
      const storedServices = localStorage.getItem("requiredServices")

      if (storedConditions) {
        setPatientConditions(JSON.parse(storedConditions))
      }

      if (storedServices) {
        setRequiredServices(JSON.parse(storedServices))
      }
    } catch (error) {
      console.error("Error retrieving patient data:", error)
    }
  }, [])

  // Simulate backend search for nearest hospitals
  const searchNearestHospitals = async (latitude: number, longitude: number) => {
    setLocationStatus("searching")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Calculate distances and add to hospital data
    const hospitalsWithDistance = hospitalDatabase.map((hospital) => {
      const distanceValue = calculateDistance(latitude, longitude, hospital.lat, hospital.lng)

      // Get Arabic condition names for matching
      const arabicConditions = patientConditions.map((c) => c.ar)

      // Calculate match score based on patient conditions and hospital services
      const matchScore = calculateHospitalMatchScore(arabicConditions, hospital.services)

      // Calculate service coverage - what percentage of required services does this hospital provide
      let serviceCoverage = 0
      if (requiredServices.length > 0 && hospital.services) {
        const matchedServices = requiredServices.filter((service) => hospital.services.includes(service))
        serviceCoverage = (matchedServices.length / requiredServices.length) * 100
      }

      return {
        ...hospital,
        distance: formatDistance(distanceValue),
        distanceValue, // Store actual distance for sorting
        matchScore, // Store match score for recommendation
        serviceCoverage, // Store service coverage percentage
        isRecommended: matchScore >= 70 || serviceCoverage >= 70, // Recommend if match score or service coverage is 70% or higher
      }
    })

    // Sort by recommendation first, then by distance
    hospitalsWithDistance.sort((a, b) => {
      // If one is recommended and the other isn't, put recommended first
      if (a.isRecommended && !b.isRecommended) return -1
      if (!a.isRecommended && b.isRecommended) return 1

      // If both are recommended, sort by service coverage
      if (a.isRecommended && b.isRecommended) {
        if (a.serviceCoverage !== b.serviceCoverage) {
          return b.serviceCoverage - a.serviceCoverage
        }
      }

      // If service coverage is the same or both are not recommended, sort by distance
      return (a.distanceValue || 0) - (b.distanceValue || 0)
    })

    setHospitals(hospitalsWithDistance)
    setLocationStatus("granted")
  }

  // Get user location and search for nearest hospitals
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])

          // Search for nearest hospitals based on location
          await searchNearestHospitals(latitude, longitude)
        },
        () => {
          setLocationStatus("denied")
          // If location access is denied, use hospitals without distance calculation
          setHospitals(
            hospitalDatabase.map((hospital) => {
              // Get Arabic condition names for matching
              const arabicConditions = patientConditions.map((c) => c.ar)

              // Calculate match score based on patient conditions and hospital services
              const matchScore = calculateHospitalMatchScore(arabicConditions, hospital.services)

              // Calculate service coverage
              let serviceCoverage = 0
              if (requiredServices.length > 0 && hospital.services) {
                const matchedServices = requiredServices.filter((service) => hospital.services.includes(service))
                serviceCoverage = (matchedServices.length / requiredServices.length) * 100
              }

              return {
                ...hospital,
                distance: "غير معروف",
                matchScore,
                serviceCoverage,
                isRecommended: matchScore >= 70 || serviceCoverage >= 70,
              }
            }),
          )
        },
      )
    } else {
      setLocationStatus("denied")
      setHospitals(
        hospitalDatabase.map((hospital) => {
          // Get Arabic condition names for matching
          const arabicConditions = patientConditions.map((c) => c.ar)

          // Calculate match score and service coverage
          const matchScore = calculateHospitalMatchScore(arabicConditions, hospital.services)

          let serviceCoverage = 0
          if (requiredServices.length > 0 && hospital.services) {
            const matchedServices = requiredServices.filter((service) => hospital.services.includes(service))
            serviceCoverage = (matchedServices.length / requiredServices.length) * 100
          }

          return {
            ...hospital,
            distance: "غير معروف",
            matchScore,
            serviceCoverage,
            isRecommended: matchScore >= 70 || serviceCoverage >= 70,
          }
        }),
      )
    }
  }, [patientConditions, requiredServices])

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.includes(searchTerm) ||
      hospital.address.includes(searchTerm) ||
      (hospital.services && hospital.services.some((service) => service.includes(searchTerm))),
  )

  // Open hospital location in Google Maps
  const openInGoogleMaps = (hospital: Hospital) => {
    const url = getGoogleMapsUrl(hospital.lat, hospital.lng, hospital.name)
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col rtl">
      <HospitalMap
        hospitals={filteredHospitals}
        userLocation={userLocation}
        onHospitalSelect={setSelectedHospital}
        recommendedHospitals={filteredHospitals.filter((h) => h.isRecommended)}
        onOpenGoogleMaps={openInGoogleMaps}
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-[rgba(255,22,22,1)]">
            <MapPin className="h-5 w-5 ml-1" />
            <span>
              {locationStatus === "searching" ? (
                <div className="flex items-center">
                  <span>جاري البحث عن المستشفيات المناسبة</span>
                  <div className="ml-2 h-4 w-4 rounded-full border-2 border-t-transparent border-[rgba(255,22,22,1)] animate-spin"></div>
                </div>
              ) : locationStatus === "granted" ? (
                patientConditions.length > 0 ? (
                  "تم العثور على المستشفيات المناسبة لحالتك"
                ) : (
                  "تم العثور على المستشفيات القريبة"
                )
              ) : locationStatus === "denied" ? (
                "يرجى السماح بالوصول إلى موقعك"
              ) : (
                "جاري تحديد موقعك"
              )}
            </span>
          </div>
        </div>

        {patientConditions.length > 0 && (
          <div className="mb-4 bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium mb-2">الحالة الطارئة:</h3>
            <div className="flex flex-wrap gap-2">
              {patientConditions.map((condition, index) => (
                <span
                  key={index}
                  className="bg-[rgba(255,22,22,0.1)] text-[rgba(255,22,22,1)] px-3 py-1 rounded-full text-sm"
                >
                  {condition.ar}
                </span>
              ))}
            </div>

            {requiredServices.length > 0 && (
              <div className="mt-3">
                <h3 className="text-sm font-medium mb-1">الخدمات الطبية المطلوبة:</h3>
                <div className="flex flex-wrap gap-2">
                  {requiredServices.map((service, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative mb-6">
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن المستشفيات"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pr-10 pl-4 border border-gray-300 rounded-full text-right"
            dir="rtl"
          />
        </div>

        {locationStatus === "searching" ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-[rgba(255,22,22,1)] animate-spin mb-4"></div>
            <p className="text-gray-600">جاري البحث عن أقرب المستشفيات المناسبة لحالتك...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                className={`bg-white rounded-lg shadow p-4 ${
                  selectedHospital?.id === hospital.id ? "border-2 border-[rgba(255,22,22,1)]" : ""
                } ${hospital.isRecommended ? "border-r-4 border-r-green-500" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">{hospital.name}</h3>
                      {hospital.isRecommended && (
                        <div className="mr-2 flex items-center text-green-500 text-xs font-medium">
                          <CheckCircle className="h-4 w-4 ml-1" />
                          موصى به لحالتك
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{hospital.address}</p>

                    {hospital.services && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hospital.services.map((service, i) => {
                          // Check if this service is required for the patient's condition
                          const isRequired = requiredServices.includes(service)

                          return (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                isRequired ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {service}
                            </span>
                          )
                        })}
                      </div>
                    )}

                    {/* Show service coverage percentage if available */}
                    {hospital.serviceCoverage > 0 && requiredServices.length > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="text-xs text-gray-600 ml-2">تغطية الخدمات المطلوبة:</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${hospital.serviceCoverage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium text-green-600 mr-2">
                            {Math.round(hospital.serviceCoverage)}%
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 ml-1 text-[rgba(255,22,22,0.8)]" />
                        <span className="text-gray-800">{hospital.phone}</span>
                      </div>

                      <button
                        className="bg-[rgba(255,22,22,1)] text-white py-2 px-4 rounded-lg mr-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `tel:${hospital.phone.replace(/\D/g, "")}`
                        }}
                      >
                        اتصال
                      </button>
                    </div>

                    {hospital.rating && (
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600 mr-1">{hospital.rating}</span>
                      </div>
                    )}

                    <button
                      className="flex items-center text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded mt-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        openInGoogleMaps(hospital)
                      }}
                    >
                      <Map className="h-3 w-3 ml-1" />
                      فتح في خرائط جوجل
                    </button>
                  </div>

                  <div className="flex flex-col items-center mr-4">
                    <span className="text-sm font-bold text-[rgba(255,22,22,1)] mb-2">{hospital.distance}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredHospitals.length === 0 && (
              <div className="text-center p-8">
                <p className="text-gray-500">لا توجد مستشفيات مطابقة لبحثك.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
