"use client"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import { Check, X, TrendingUp, Shield, Zap, DollarSign, Building2, Users, Award, Download } from "lucide-react"

const FEATURES_COMPARISON = [
  {
    feature: "Cost per Sensor",
    ourSensor: "₹35,000 - ₹45,000",
    govSensor: "₹1,00,000 - ₹1,50,000",
    advantage: "our",
  },
  {
    feature: "Installation Cost",
    ourSensor: "₹5,000 - ₹8,000",
    govSensor: "₹20,000 - ₹30,000",
    advantage: "our",
  },
  {
    feature: "Maintenance (Annual)",
    ourSensor: "₹3,000 - ₹5,000",
    govSensor: "₹15,000 - ₹25,000",
    advantage: "our",
  },
  {
    feature: "Real-time Data",
    ourSensor: "Yes (Cloud-based)",
    govSensor: "Limited (Manual Collection)",
    advantage: "our",
  },
  {
    feature: "Mobile App Access",
    ourSensor: "Yes",
    govSensor: "No",
    advantage: "our",
  },
  {
    feature: "Community Integration",
    ourSensor: "Yes (Full Platform)",
    govSensor: "No",
    advantage: "our",
  },
  {
    feature: "AI Predictions",
    ourSensor: "Yes",
    govSensor: "No",
    advantage: "our",
  },
  {
    feature: "Data Accuracy",
    ourSensor: "95%+ (Certified)",
    govSensor: "90-95%",
    advantage: "our",
  },
  {
    feature: "Calibration Required",
    ourSensor: "Every 6 months",
    govSensor: "Every 3 months",
    advantage: "our",
  },
  {
    feature: "Warranty",
    ourSensor: "2 years",
    govSensor: "1 year",
    advantage: "our",
  },
]

const PRICING_PACKAGES = [
  {
    name: "Residential Society",
    description: "Perfect for apartment complexes and housing societies",
    price: "₹35,000",
    features: [
      "1 D.A.R.T Sensor Unit",
      "Real-time AQI monitoring",
      "Mobile app access for all residents",
      "Community dashboard",
      "Basic AI predictions",
      "1 year warranty",
      "Free installation & setup",
    ],
    popular: false,
  },
  {
    name: "Commercial Package",
    description: "Ideal for offices, schools, and commercial buildings",
    price: "₹45,000",
    features: [
      "1 D.A.R.T Sensor Unit",
      "Real-time AQI monitoring",
      "Multi-user dashboard",
      "Custom alerts & notifications",
      "Advanced AI predictions",
      "Historical data analysis",
      "2 years warranty",
      "Free installation & setup",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise Solution",
    description: "For multiple locations and large-scale deployments",
    price: "Custom",
    features: [
      "Multiple sensor units",
      "Centralized management dashboard",
      "API access for integration",
      "Custom analytics & reporting",
      "Dedicated account manager",
      "On-site training",
      "Extended warranty options",
      "24/7 support",
    ],
    popular: false,
  },
]

const WHY_CHOOSE_US = [
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "Up to 70% cheaper than government sensors while maintaining professional-grade accuracy and reliability.",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description: "Cloud-based system provides instant updates to your mobile app, keeping you informed 24/7.",
  },
  {
    icon: Shield,
    title: "Certified Accuracy",
    description: "Our sensors meet international standards with 95%+ accuracy, comparable to expensive government equipment.",
  },
  {
    icon: Users,
    title: "Community Integration",
    description: "Built-in platform connects your society members, enabling collective action and awareness.",
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Predictions",
    description: "Machine learning algorithms predict air quality trends, helping you plan ahead for better health decisions.",
  },
  {
    icon: Building2,
    title: "Easy Installation",
    description: "Quick setup with minimal infrastructure. Our team handles everything from installation to training.",
  },
]

const ROI_CALCULATION = {
  govSensor: {
    initial: 125000,
    maintenance: 20000,
    totalYear1: 145000,
    totalYear5: 225000,
  },
  ourSensor: {
    initial: 40000,
    maintenance: 4000,
    totalYear1: 44000,
    totalYear5: 56000,
  },
  savings: {
    year1: 101000,
    year5: 169000,
    percentage: 75,
  },
}

export default function BusinessModelPage() {
  const [selectedPackage, setSelectedPackage] = useState(1)

  return (
    <PageLayout title="Business Model" subtitle="Affordable air quality monitoring for societies and communities">
      <div className="flex-1 flex flex-col gap-8">
        {/* Hero Section */}
        <div className="glass-panel rounded-3xl p-8 text-center">
          <h1 className="text-4xl font-bold glass-text mb-4">
            Why Choose D.A.R.T Sensors?
          </h1>
          <p className="text-lg glass-text-muted max-w-3xl mx-auto">
            Professional-grade air quality monitoring at a fraction of the cost. Our sensors deliver government-level accuracy
            while being 70% more affordable and offering superior features.
          </p>
        </div>

        {/* Cost Comparison */}
        <div className="glass-panel rounded-3xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold glass-text mb-4 sm:mb-6">Cost Comparison</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[var(--glass-border)]">
                  <th className="text-left py-4 px-4 glass-text font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 glass-text font-semibold bg-green-500/10">D.A.R.T Sensor</th>
                  <th className="text-center py-4 px-4 glass-text font-semibold bg-red-500/10">Government Sensor</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES_COMPARISON.map((item, index) => (
                  <tr key={index} className="border-b border-[var(--glass-border)]/50">
                    <td className="py-4 px-4 glass-text">{item.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="glass-text">{item.ourSensor}</span>
                        {item.advantage === "our" && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="glass-text-muted">{item.govSensor}</span>
                        {item.advantage === "our" && (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-xl font-semibold glass-text mb-4">5-Year Cost Analysis</h3>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="glass-text-muted">Government Sensor</span>
                  <span className="glass-text font-semibold">₹2,25,000</span>
                </div>
                <div className="text-xs glass-text-muted">Initial: ₹1,25,000 + Maintenance: ₹1,00,000</div>
              </div>
              <div className="glass-card rounded-xl p-4 bg-green-500/10 border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="glass-text">D.A.R.T Sensor</span>
                  <span className="text-green-500 font-semibold">₹56,000</span>
                </div>
                <div className="text-xs glass-text-muted">Initial: ₹40,000 + Maintenance: ₹16,000</div>
              </div>
              <div className="glass-card rounded-xl p-4 bg-[var(--glass-accent)]/20 border border-[var(--glass-accent)]/50">
                <div className="flex items-center justify-between">
                  <span className="glass-text font-semibold">Total Savings (5 Years)</span>
                  <span className="text-[var(--glass-accent)] font-bold text-lg">₹1,69,000</span>
                </div>
                <div className="text-xs glass-text-muted mt-1">75% cost reduction</div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-xl font-semibold glass-text mb-4">Why Our Price Point Works</h3>
            <div className="space-y-3">
              {[
                "Mass production reduces unit costs",
                "Cloud-based infrastructure eliminates expensive on-site servers",
                "Efficient maintenance reduces long-term expenses",
                "Community model enables bulk deployments",
                "No government procurement overhead",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="glass-text">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold glass-text mb-6">Why Choose D.A.R.T?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {WHY_CHOOSE_US.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="glass-card rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--glass-accent)]/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--glass-accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold glass-text mb-2">{item.title}</h3>
                  <p className="glass-text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold glass-text mb-6 text-center">Pricing Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_PACKAGES.map((pkg, index) => (
              <div
                key={index}
                className={`glass-card rounded-2xl p-6 relative ${
                  pkg.popular ? "border-2 border-[var(--glass-accent)] bg-[var(--glass-accent)]/10" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-[var(--glass-accent)] text-slate-900 px-4 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold glass-text mb-2">{pkg.name}</h3>
                <p className="glass-text-muted text-sm mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold glass-text">{pkg.price}</span>
                  {pkg.price !== "Custom" && (
                    <span className="glass-text-muted text-sm ml-2">one-time</span>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="glass-text text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    pkg.popular
                      ? "bg-[var(--glass-accent)] text-slate-900 hover:brightness-110 shadow-lg shadow-[var(--glass-accent)]/25"
                      : "glass-button glass-text hover:brightness-110"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass-panel rounded-3xl p-8 bg-gradient-to-r from-[var(--glass-accent)]/20 to-green-500/20 border border-[var(--glass-accent)]/30">
          <div className="text-center max-w-2xl mx-auto">
            <Award className="w-12 h-12 text-[var(--glass-accent)] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold glass-text mb-4">
              Ready to Monitor Air Quality in Your Society?
            </h2>
            <p className="glass-text-muted mb-6">
              Join hundreds of societies across Navi Mumbai who have chosen D.A.R.T for affordable, accurate,
              and community-integrated air quality monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-xl bg-[var(--glass-accent)] text-slate-900 font-semibold hover:brightness-110 transition-all shadow-lg shadow-[var(--glass-accent)]/25 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Brochure
              </button>
              <button className="px-6 py-3 rounded-xl glass-button glass-text font-semibold hover:brightness-110 transition-all">
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}