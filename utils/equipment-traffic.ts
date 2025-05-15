// Calculate estimated arrival time based on distance and traffic
export function calculateEstimatedArrivalTime(distanceKm: number, trafficFactor: number): string {
  // Base speed in km/h (adjust as needed)
  const baseSpeed = 60

  // Adjust speed based on traffic factor
  const adjustedSpeed = baseSpeed / trafficFactor

  // Calculate time in minutes
  const timeMinutes = Math.round((distanceKm / adjustedSpeed) * 60)

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
    "نوبة قلبية": ["جهاز صدمات القلب", "جهاز تخطيط القلب", "أجهزة مراقبة حيوية"],
    "سكتة دماغية": ["جهاز تصوير مقطعي", "جهاز رنين مغناطيسي", "أجهزة مراقبة حيوية"],
    كسور: ["جهاز أشعة سينية", "جبائر وأدوات تجبير", "أجهزة تصوير"],
    حروق: ["وحدة علاج الحروق", "أجهزة تعقيم", "أدوات ضمادات متخصصة"],
    تسمم: ["وحدة غسيل معدة", "أجهزة تحليل سموم", "أجهزة مراقبة حيوية"],
    "صعوبة في التنفس": ["أجهزة تنفس صناعي", "أجهزة أكسجين", "أجهزة قياس الأكسجين"],
    "إصابات خطيرة": ["غرفة عمليات", "أجهزة تصوير متقدمة", "أدوات جراحية متخصصة"],
    "نزيف حاد": ["وحدة نقل دم", "أجهزة تخثير", "أجهزة مراقبة حيوية"],
    "ألم في الصدر": ["جهاز تخطيط القلب", "أجهزة مراقبة حيوية", "وحدة عناية قلبية"],
    "فقدان الوعي": ["أجهزة مراقبة حيوية", "جهاز تصوير مقطعي للدماغ", "أجهزة إنعاش"],
    إغماء: ["جهاز تنفس صناعي", "جهاز تخطيط أعصاب", "وحدة عناية مركزة"],
    حرق: ["وحدة حروق", "غرفة عمليات"],
    "حادث طريق": ["غرفة عمليات متقدمة", "وحدة عناية مركزة", "جهاز أشعة مقطعية"],
    "ألم في القلب": ["جهاز قلب متقدم", "قسطرة قلبية", "وحدة عناية مركزة"],
    كسر: ["أشعة سينية", "جهاز رنين مغناطيسي"],
    نزيف: ["غرفة عمليات", "بنك دم"],
  }

  // Default equipment needed for any emergency
  let requiredEquipment = ["أجهزة مراقبة حيوية", "أدوات إسعافات أولية"]

  // Add specific equipment based on conditions
  conditions.forEach((condition) => {
    if (equipmentMap[condition]) {
      requiredEquipment = [...requiredEquipment, ...equipmentMap[condition]]
    }
  })

  // Remove duplicates
  return [...new Set(requiredEquipment)]
}

// Calculate equipment match score (percentage of required equipment available)
export function calculateEquipmentMatchScore(requiredEquipment: string[], hospitalEquipment: string[] = []): number {
  if (requiredEquipment.length === 0) return 0
  if (hospitalEquipment.length === 0) return 0

  const matchedEquipment = requiredEquipment.filter((item) => hospitalEquipment.includes(item))
  return (matchedEquipment.length / requiredEquipment.length) * 100
}
