import { Suspense } from "react"
import MapClient from "./map-client"

export default function MapPage() {
  return (
    <Suspense fallback={null}>
      <MapClient />
    </Suspense>
  )
}
