import PageLayout from "@/components/page-layout"
import CommunityDashboard from "./community-dashboard"
import { Suspense } from "react"

export const metadata = {
  title: "Community Action - D.A.R.T",
  description: "Report pollution issues and take community action",
}

export default function CommunityPage() {
  return (
    <PageLayout>
      <Suspense fallback={<div className="glass-panel rounded-3xl p-8 animate-pulse h-96" />}>
        <CommunityDashboard />
      </Suspense>
    </PageLayout>
  )
}
