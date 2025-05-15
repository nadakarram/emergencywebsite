// Maps emergency conditions to required medical services
export const conditionServiceMapping: Record<string, string[]> = {
  إغماء: ["طوارئ", "باطنة", "أعصاب"],
  حرق: ["طوارئ", "جراحة", "جلدية"],
  "حادث طريق": ["طوارئ", "جراحة", "عظام", "عناية مركزة"],
  "ألم في القلب": ["طوارئ", "قلب", "باطنة"],
  "صعوبة التنفس": ["طوارئ", "صدر", "باطنة"],
  // Default services for any condition
  default: ["طوارئ"],
}

// Common symptoms and their related medical specialties
export const symptomToSpecialty: Record<string, string[]> = {
  // Neurological
  صداع: ["أعصاب", "باطنة"],
  دوخة: ["أعصاب", "باطنة", "أذن وأنف وحنجرة"],
  تشنج: ["أعصاب", "طوارئ"],
  شلل: ["أعصاب", "طوارئ", "عناية مركزة"],

  // Cardiac
  "ألم صدر": ["قلب", "طوارئ", "باطنة"],
  "خفقان قلب": ["قلب", "باطنة"],
  "ضيق تنفس": ["قلب", "صدر", "طوارئ"],

  // Respiratory
  سعال: ["صدر", "باطنة"],
  "ضيق نفس": ["صدر", "قلب", "طوارئ"],
  ربو: ["صدر", "طوارئ"],

  // Digestive
  "ألم بطن": ["باطنة", "جراحة"],
  إسهال: ["باطنة"],
  قيء: ["باطنة", "طوارئ"],

  // Musculoskeletal
  "ألم ظهر": ["عظام", "جراحة"],
  "ألم مفاصل": ["عظام", "روماتيزم"],
  كسر: ["عظام", "جراحة", "طوارئ"],

  // Skin
  طفح: ["جلدية"],
  حكة: ["جلدية"],
  حروق: ["جلدية", "جراحة", "طوارئ"],

  // General
  حمى: ["باطنة", "طوارئ"],
  تعب: ["باطنة"],
  نزيف: ["جراحة", "طوارئ"],
}

// Function to get required services for a condition
export function getRequiredServices(condition: string): string[] {
  // Check if the condition is in our predefined mapping
  if (condition in conditionServiceMapping) {
    return conditionServiceMapping[condition]
  }

  // If not, try to match keywords from the condition with our symptom mapping
  for (const [symptom, specialties] of Object.entries(symptomToSpecialty)) {
    if (condition.includes(symptom)) {
      return specialties
    }
  }

  // If no matches found, analyze the condition text to make a best guess
  if (condition.includes("ألم") || condition.includes("وجع")) {
    if (condition.includes("رأس") || condition.includes("دماغ")) {
      return ["أعصاب", "باطنة"]
    }
    if (condition.includes("صدر") || condition.includes("قلب")) {
      return ["قلب", "باطنة", "طوارئ"]
    }
    if (condition.includes("بطن") || condition.includes("معدة")) {
      return ["باطنة", "جراحة"]
    }
    if (condition.includes("ظهر") || condition.includes("مفصل") || condition.includes("عظم")) {
      return ["عظام"]
    }
  }

  if (condition.includes("تنفس") || condition.includes("صدر") || condition.includes("رئة")) {
    return ["صدر", "طوارئ"]
  }

  if (condition.includes("جلد") || condition.includes("طفح") || condition.includes("حكة")) {
    return ["جلدية"]
  }

  if (condition.includes("نزيف") || condition.includes("دم")) {
    return ["جراحة", "طوارئ"]
  }

  if (condition.includes("كسر") || condition.includes("إصابة")) {
    return ["عظام", "جراحة", "طوارئ"]
  }

  // Default to emergency services if we can't determine specifics
  return conditionServiceMapping.default
}

// Calculate hospital match score based on patient condition and hospital services
export function calculateHospitalMatchScore(patientConditions: string[], hospitalServices: string[] = []): number {
  if (patientConditions.length === 0 || hospitalServices.length === 0) {
    return 0
  }

  let totalScore = 0
  let requiredServicesCount = 0

  // For each patient condition, check if hospital has required services
  patientConditions.forEach((condition) => {
    const requiredServices = getRequiredServices(condition)
    requiredServicesCount += requiredServices.length

    requiredServices.forEach((service) => {
      if (hospitalServices.includes(service)) {
        totalScore += 1
      }
    })
  })

  // Calculate percentage match (0 to 100)
  return requiredServicesCount > 0 ? (totalScore / requiredServicesCount) * 100 : 0
}
