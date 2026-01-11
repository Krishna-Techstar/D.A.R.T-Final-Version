import { Suspense } from "react"
import EventsClient from "./events-client"

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--glass-accent)]" />
        </div>
      }
    >
      <EventsClient />
    </Suspense>
  )
}
