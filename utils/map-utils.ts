// Generate Google Maps URL for a location
export function getGoogleMapsUrl(lat: number, lng: number, name = ""): string {
  // URL encode the name
  const encodedName = encodeURIComponent(name)

  // Create Google Maps URL with the location and name
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodedName}`
}

// Generate Google Maps directions URL from user's current location to a destination
export function getGoogleMapsDirectionsUrl(destLat: number, destLng: number, name = ""): string {
  // URL encode the name and coordinates
  const encodedName = encodeURIComponent(name)
  const destination = encodeURIComponent(`${destLat},${destLng}`)

  // Create Google Maps directions URL
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${encodedName}&travelmode=driving`
}
