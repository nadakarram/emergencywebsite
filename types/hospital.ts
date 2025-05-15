export interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  distance: string
  lat: number
  lng: number
  services?: string[]
  openHours?: string
  rating?: number
  distanceValue?: number // Actual distance in km (for sorting)
  matchScore?: number // Score indicating how well hospital matches patient needs
  isRecommended?: boolean // Whether this hospital is recommended for the patient
}
