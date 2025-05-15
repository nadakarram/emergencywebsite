// Generate Google Maps URL for a location
export function getGoogleMapsUrl(lat: number, lng: number, name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`
}

// Generate Google Maps directions URL from user's current location to a destination
export function getGoogleMapsDirectionsUrl(
  destLat: number,
  destLng: number,
  destName: string,
  userLat?: number,
  userLng?: number,
): string {
  // If we have user location, use it as the origin
  const originParam = userLat && userLng ? `&origin=${userLat},${userLng}` : ""

  // Add destination coordinates
  const destinationParam = `&destination=${destLat},${destLng}`

  // Add traffic layer and travel mode
  const trafficParam = "&travelmode=driving&layer=traffic"

  return `https://www.google.com/maps/dir/?api=1${originParam}${destinationParam}${trafficParam}`
}

// Calculate estimated arrival time based on distance and traffic
export function calculateEstimatedArrivalTime(distanceKm: number, trafficFactor = 1.0): string {
  // Base speed in km/h (average urban driving speed)
  const baseSpeed = 30

  // Adjust speed based on traffic factor
  const adjustedSpeed = baseSpeed / trafficFactor

  // Calculate time in hours
  const timeHours = distanceKm / adjustedSpeed

  // Convert to minutes
  const timeMinutes = Math.round(timeHours * 60)

  if (timeMinutes < 60) {
    return `${timeMinutes} دقيقة`
  } else {
    const hours = Math.floor(timeMinutes / 60)
    const minutes = timeMinutes % 60
    return `${hours} ساعة ${minutes > 0 ? `و ${minutes} دقيقة` : ""}`
  }
}

// Map condition to required equipment
export function getRequiredEquipment(conditions: string[]): string[] {
  const equipmentMap: Record<string, string[]> = {
    إغماء: ["جهاز تنفس صناعي", "جهاز تخطيط أعصاب", "وحدة عناية مركزة"],
    حرق: ["وحدة حروق", "غرفة عمليات"],
    "حادث طريق": ["غرفة عمليات متقدمة", "وحدة عناية مركزة", "جهاز أشعة مقطعية"],
    "ألم في القلب": ["جهاز قلب متقدم", "قسطرة قلبية", "وحدة عناية مركزة"],
    "صعوبة التنفس": ["جهاز تنفس صناعي", "وحدة عناية مركزة"],
    كسر: ["أشعة سينية", "جهاز رنين مغناطيسي"],
    نزيف: ["غرفة عمليات", "بنك دم"],
  }

  const allRequiredEquipment = new Set<string>()

  conditions.forEach((condition) => {
    // Check if we have a direct match
    for (const [key, equipment] of Object.entries(equipmentMap)) {
      if (condition.includes(key)) {
        equipment.forEach((item) => allRequiredEquipment.add(item))
      }
    }
  })

  // If no specific equipment was found, return basic emergency equipment
  if (allRequiredEquipment.size === 0) {
    return ["وحدة طوارئ", "معمل تحاليل"]
  }

  return Array.from(allRequiredEquipment)
}

// Calculate equipment match score
export function calculateEquipmentMatchScore(requiredEquipment: string[], hospitalEquipment: string[] = []): number {
  if (requiredEquipment.length === 0 || hospitalEquipment.length === 0) {
    return 0
  }

  let matchCount = 0
  requiredEquipment.forEach((item) => {
    if (hospitalEquipment.some((equipment) => equipment.includes(item) || item.includes(equipment))) {
      matchCount++
    }
  })

  return (matchCount / requiredEquipment.length) * 100
}
