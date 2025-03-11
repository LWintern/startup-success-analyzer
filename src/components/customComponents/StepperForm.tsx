






"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { steps } from "../../../data/stepperForm"
import axios from 'axios';

export default function StepperForm() {
  const totalSteps = steps.length
  const [activeStep, setActiveStep] = useState<number>(1)
  const [formData, setFormData] = useState<Record<string, string | string[]>>({})

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

  const handleChange = (fieldId: string, value: string | string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }))
  }

  const isFormComplete = () => {
    const currentFields = steps.flatMap(step => step.fields)
    return currentFields.every(field => {
      const value = formData[field.label]
      return field.type === "checkbox" ? Array.isArray(value) && value.length > 0 : value
    })
  }

  const handleSubmit = async () => {
    if (isFormComplete()) {
      try {
        const response = await axios.post('/api/formdata', formData);
        console.log('Form submitted:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      alert('Please fill in all required fields.');
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
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {currentStep.fields.map((field, index) => (
              <div key={index} className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label htmlFor={`field-${index}`} className="text-gray-600 text-right">
                  {field.label}
                </label>
                {field.type === "text" && (
                  <Input
                    id={`field-${index}`}
                    className="border border-gray-300"
                    value={formData[field.label] as string || ""}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                  />
                )}
                {field.type === "number" && (
                  <Input
                    id={`field-${index}`}
                    type="number"
                    className="border border-gray-300"
                    value={formData[field.label] as string || ""}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                  />
                )}
                {field.type === "dropdown" && (
                  <select
                    id={`field-${index}`}
                    className="border border-gray-300 p-2 rounded"
                    value={formData[field.label] as string || ""}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                  >
                    <option value="">Select</option>
                    {field.options?.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "select" && field.options?.includes("Yes") && field.options?.includes("No") ? (
                  <div className="flex gap-4">
                    {field.options.map((option, i) => (
                      <label key={i} className="flex items-center">
                        <input
                          type="radio"
                          name={`field-${index}`}
                          value={option}
                          checked={formData[field.label] === option}
                          onChange={(e) => handleChange(field.label, e.target.value)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  field.type === "select" && (
                    <select
                      id={`field-${index}`}
                      className="border border-gray-300 p-2 rounded"
                      value={formData[field.label] as string || ""}
                      onChange={(e) => handleChange(field.label, e.target.value)}
                    >
                      <option value="">Select</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )
                )}
                {field.type === "checkbox" && (
                  <div className="flex flex-wrap gap-2">
                    {field.options?.map((option, i) => (
                      <label key={i} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option}
                          checked={(formData[field.label] as string[] || []).includes(option)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...(formData[field.label] as string[] || []), option]
                              : (formData[field.label] as string[] || []).filter((val) => val !== option)
                            handleChange(field.label, newValue)
                          }}
                          className="mr-2"
                        />
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

              {activeStep === totalSteps ? (
                <Button onClick={handleSubmit} className="bg-[#ff0000] hover:bg-red-700">
                  SUBMIT
                </Button>
              ) : (
                <Button onClick={handleNext} className="bg-[#ff0000] hover:bg-red-700">
                  NEXT
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bta.png')" }}></div>
      </div>
    </div>
  )
}