"use client"

import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import type { Hospital } from "@/types/hospital"
import { Map } from "lucide-react"

// Fix Leaflet marker icon issue in Next.js
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

// Create a simple red marker icon using Leaflet's DivIcon
const createHospitalIcon = (isRecommended = false) => {
  return L.divIcon({
    html: `<div style="background-color: ${isRecommended ? "#22c55e" : "rgba(255,22,22,1)"}; width: ${isRecommended ? "16px" : "12px"}; height: ${isRecommended ? "16px" : "12px"}; border-radius: 50%; border: 2px solid white;"></div>`,
    className: "hospital-marker",
    iconSize: [isRecommended ? 20 : 16, isRecommended ? 20 : 16],
    iconAnchor: [isRecommended ? 10 : 8, isRecommended ? 10 : 8],
    popupAnchor: [0, isRecommended ? -10 : -8],
  })
}

// Create a user location marker icon
const createUserIcon = () => {
  return L.divIcon({
    html: `<div style="background-color: #4285F4; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.5);"></div>`,
    className: "user-marker",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  })
}

interface MapProps {
  hospitals: Hospital[]
  userLocation: [number, number] | null
  onHospitalSelect: (hospital: Hospital) => void
  recommendedHospitals?: Hospital[]
  onOpenGoogleMaps?: (hospital: Hospital) => void
}

// Component to recenter map when user location changes
function ChangeMapView({ coords }: { coords: [number, number] | null }) {
  const map = useMap()

  useEffect(() => {
    if (coords) {
      map.setView(coords, 13)
    }
  }, [coords, map])

  return null
}

// Update the map component to show traffic indicators
export default function HospitalMap({
  hospitals,
  userLocation,
  onHospitalSelect,
  recommendedHospitals = [],
  onOpenGoogleMaps,
}: MapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [regularHospitalIcon, setRegularHospitalIcon] = useState<L.DivIcon | null>(null)
  const [recommendedHospitalIcon, setRecommendedHospitalIcon] = useState<L.DivIcon | null>(null)
  const [userIcon, setUserIcon] = useState<L.DivIcon | null>(null)

  useEffect(() => {
    setIsMounted(true)
    fixLeafletIcon()
    setRegularHospitalIcon(createHospitalIcon(false))
    setRecommendedHospitalIcon(createHospitalIcon(true))
    setUserIcon(createUserIcon())
  }, [])

  if (!isMounted)
    return <div className="h-[300px] w-full bg-gray-200 flex items-center justify-center">جاري تحميل الخريطة...</div>

  // Default to Cairo, Egypt if no user location
  const defaultPosition: [number, number] = [30.0444, 31.2357]
  const center = userLocation || defaultPosition

  // Create a set of recommended hospital IDs for quick lookup
  const recommendedHospitalIds = new Set(recommendedHospitals.map((h) => h.id))

  return (
    <div className="h-[300px] w-full relative z-0">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Marker position={userLocation} icon={userIcon || L.Icon.Default.prototype}>
              <Popup>موقعك الحالي</Popup>
            </Marker>
            <Circle
              center={userLocation}
              radius={1000}
              pathOptions={{ color: "#4285F4", fillColor: "#4285F4", fillOpacity: 0.1, weight: 1 }}
            />
          </>
        )}

        {hospitals.map((hospital) => {
          const isRecommended = recommendedHospitalIds.has(hospital.id)
          return (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lng]}
              icon={(isRecommended ? recommendedHospitalIcon : regularHospitalIcon) || L.Icon.Default.prototype}
              eventHandlers={{
                click: () => onHospitalSelect(hospital),
              }}
            >
              <Popup>
                <div className="rtl text-right">
                  <h3 className="font-bold">{hospital.name}</h3>
                  {isRecommended && <p className="text-green-600 text-sm font-medium">موصى به لحالتك</p>}
                  <p>{hospital.address}</p>
                  <p className="text-[rgba(255,22,22,1)]">{hospital.distance}</p>

                  {/* Traffic indicator */}
                  <div className="flex items-center mt-1">
                    <div
                      className={`w-2 h-2 rounded-full mr-1 ${
                        hospital.trafficFactor <= 0.8
                          ? "bg-green-500"
                          : hospital.trafficFactor <= 1.2
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-xs">
                      {hospital.trafficFactor <= 0.8
                        ? "حركة مرور خفيفة"
                        : hospital.trafficFactor <= 1.2
                          ? "حركة مرور متوسطة"
                          : "حركة مرور كثيفة"}
                    </span>
                  </div>

                  {/* Estimated arrival time */}
                  {hospital.estimatedArrivalTime && (
                    <p className="text-xs mt-1">وقت الوصول: {hospital.estimatedArrivalTime}</p>
                  )}

                  {onOpenGoogleMaps && (
                    <button
                      className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded w-full justify-center mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenGoogleMaps(hospital)
                      }}
                    >
                      <Map className="h-3 w-3 ml-1" />
                      فتح في خرائط جوجل
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

        <ChangeMapView coords={userLocation} />
      </MapContainer>
    </div>
  )
}
