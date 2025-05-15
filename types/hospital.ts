export interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  distance: string
  lat: number
  lng: number
  services?: string[]
  equipment?: string[] // Medical equipment available
  openHours?: string
  rating?: number
  distanceValue?: number // Actual distance in km (for sorting)
  matchScore?: number // Score indicating how well hospital matches patient needs
  isRecommended?: boolean // Whether this hospital is recommended for the patient
  trafficFactor?: number // Traffic congestion factor (higher means more traffic)
  estimatedArrivalTime?: string // Estimated time to arrive considering traffic
  equipmentMatchScore?: number // Score for matching equipment to patient needs
  totalScore?: number // Combined score for overall ranking
}
