"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Define types for the fields and steps
type Field = {
  label: string
  type: "text" | "number" | "dropdown" | "select" | "checkbox"
  options?: string[]
}

type Step = {
  id: number
  title: string
  fields: Field[]
}

export default function StepperForm() {
  // Define your custom steps and fields
  const steps: Step[] = [
    {
      id: 1,
      title: "General Startup Information",
      fields: [
        { label: "Startup Name", type: "text" },
        { label: "Founder’s Name", type: "text" },
        { label: "Founder’s Contact Email & Phone", type: "text" },
        { label: "Startup Registration Year", type: "dropdown", options: Array.from({ length: 11 }, (_, i) => (2014 + i).toString()) },
        { label: "Are you registered with IStart Rajasthan?", type: "select", options: ["Yes", "No"] },
        { label: "Startup Industry/Sector", type: "dropdown", options: ["IT", "EdTech", "AgriTech", "HealthTech"] },
        { label: "Current Startup Stage", type: "dropdown", options: ["Idea", "MVP", "Early Revenue", "Growth", "Scaling"] },
        { label: "Total Number of Employees (Full-Time)", type: "number" },
        { label: "Total Number of Founders", type: "number" },
        { label: "Does your startup have a legal entity?", type: "select", options: ["Yes", "No"] },
      ],
    },
    {
      id: 2,
      title: "Financial Performance & Funding",
      fields: [
        { label: "Has your startup generated revenue in the last 2 years?", type: "select", options: ["Yes", "No"] },
        { label: "Total revenue in the last 2 years?", type: "dropdown", options: ["₹0", "<₹10L", "₹10L-₹50L", "₹50L-₹1Cr", ">₹1Cr"] },
        { label: "Have you raised external funding?", type: "select", options: ["Yes", "No"] },
        { label: "If yes, how much funding have you raised?", type: "dropdown", options: ["Bootstrapped", "₹0-₹10L", "₹10L-₹50L", "₹50L-₹1Cr", ">₹1Cr"] },
        { label: "Primary source of funding?", type: "dropdown", options: ["Self-funded", "Angel", "VC", "Government Grant"] },
        { label: "Is your startup currently profitable?", type: "select", options: ["Yes", "No"] },
        { label: "Biggest financial challenge?", type: "dropdown", options: ["No revenue", "High expenses", "Investor rejection"] },
      ],
    },
    {
      id: 3,
      title: "Market Traction & Customer Engagement",
      fields: [
        { label: "Do you have a Minimum Viable Product (MVP)?", type: "select", options: ["Yes", "No"] },
        { label: "Is your product/service currently in use?", type: "select", options: ["Yes", "No"] },
        { label: "Do you have paying customers?", type: "select", options: ["Yes", "No"] },
        { label: "How many paying customers do you have?", type: "dropdown", options: ["0", "1-10", "11-50", "51-100", ">100"] },
        { label: "What is your primary business model?", type: "dropdown", options: ["Subscription", "One-time sale", "Service-based", "Ad Revenue"] },
        { label: "What are your main customer acquisition channels?", type: "checkbox", options: ["Social Media", "Paid Ads", "Partnerships", "Referrals"] },
        { label: "What is your biggest challenge in acquiring customers?", type: "dropdown", options: ["High competition", "Pricing", "Awareness"] },
      ],
    },
    {
      id: 4,
      title: "Technology & Innovation",
      fields: [
        { label: "Is your startup tech-enabled?", type: "select", options: ["Yes", "No"] },
        { label: "Are you using emerging technologies (AI, Blockchain, IoT, etc.)?", type: "select", options: ["Yes", "No"] },
        { label: "Do you have IP protection (patents, trademarks, copyrights)?", type: "select", options: ["Yes", "No"] },
        { label: "Biggest technical challenge faced?", type: "dropdown", options: ["Scalability", "Security", "Cost", "Lack of Developers"] },
      ],
    },
    {
      id: 5,
      title: "Team & Operations",
      fields: [
        { label: "Do you have co-founders?", type: "select", options: ["Yes", "No"] },
        { label: "Does your core team have industry expertise?", type: "select", options: ["Yes", "No"] },
        { label: "Biggest operational challenge?", type: "dropdown", options: ["Hiring", "Funding", "Market Fit", "Scaling"] },
      ],
    },
    {
      id: 6,
      title: "Reason for Struggle & Support Required",
      fields: [
        { label: "Primary reason for your startup’s struggle?", type: "dropdown", options: ["Funding", "Team", "Market Fit", "Technology", "Legal"] },
        { label: "What type of support do you need?", type: "checkbox", options: ["Funding", "Business Mentorship", "Tech Support", "Strategy"] },
        { label: "Are you willing to undergo a structured restart program?", type: "select", options: ["Yes", "No"] },
      ],
    },
  ]

  const totalSteps = steps.length
  const [activeStep, setActiveStep] = useState<number>(1)

  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const currentStep = steps[activeStep - 1]

  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-6xl mx-auto w-full">
      {/* Left sidebar */}
      <div className="flex md:flex-col md:w-80 bg-gradient-to-r from-[#520000] via-[#710000] via-[#a50000] to-[#ce0000] rounded-r-lg text-white p-6">
        <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 my-auto overflow-x-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-4 justify-between">
              <span className={`text-lg ${step.id === activeStep ? "font-bold" : "opacity-80"}`}>
                {step.title}
              </span>
              <div
                className={`flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full ${
                  step.id === activeStep ? "bg-white border-[3px] border-green-400 text-green-400" : "bg-white shadow-lg text-gray-400"
                }`}
                style={{ zIndex: 100 }}
              >
                {step.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 flex items-center relative ml-0 md:-ml-16 lg:-ml-16">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 pl-8 relative z-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm text-gray-500">Approx Time: 2 Mins</h2>
            <div className="text-blue-800 font-medium text-sm">
              <a href="#" className="hover:underline">
                Download
              </a>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {currentStep.fields.map((field, index) => (
              <div key={index} className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label htmlFor={`field-${index}`} className="text-gray-600 text-right">
                  {field.label}
                </label>
                {field.type === "text" && <Input id={`field-${index}`} className="border border-gray-300" />}
                {field.type === "number" && <Input id={`field-${index}`} type="number" className="border border-gray-300" />}
                {field.type === "dropdown" && (
                  <select id={`field-${index}`} className="border border-gray-300 p-2 rounded">
                    {field.options?.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "select" && (
                  <select id={`field-${index}`} className="border border-gray-300 p-2 rounded">
                    {field.options?.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "checkbox" && (
                  <div className="flex flex-wrap gap-2">
                    {field.options?.map((option, i) => (
                      <label key={i} className="flex items-center">
                        <input type="checkbox" value={option} className="mr-2" />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress and navigation */}
          <div className="mt-8">
            <div className="w-full mb-4">
              <Progress value={(activeStep / totalSteps) * 100} className="h-2 bg-gray-200" />
              <span className="text-xs text-gray-500 mt-1 inline-block">
                {((totalSteps - activeStep) / totalSteps) * 100}% Left
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" onClick={handlePrevious} className="border-red-500 hover:text-[#ff0000] text-red-500" disabled={activeStep === 1}>
                <ChevronLeft className="h-4 w-4 mr-1" /> 
                PREVIOUS
              </Button>

              <Button onClick={handleNext} className="bg-[#ff0000] hover:bg-red-700" disabled={activeStep === totalSteps}>
                NEXT
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}></div>
      </div>
    </div>
  )
}