// src/components/customComponents/StepperForm.tsx
"use client"
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { steps } from "../../../data/stepperForm";
import { evaluateStartup } from "../../../utils/formula";
import { StartupData } from "../../../types/formula";
import FormDataDisplay from './FormDataDisplay';

export default function StepperForm() {
  const totalSteps = steps.length;
  const [activeStep, setActiveStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [reportVisible, setReportVisible] = useState<boolean>(false);
  const [reportData, setReportData] = useState<StartupData & { totalScore: number; category: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (activeStep < totalSteps) {
      if (isStepComplete(activeStep)) {
        setCompletedSteps(prev => {
          const newSet = new Set(prev);
          newSet.add(activeStep);
          return newSet;
        });
      }
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleChange = (fieldId: string, value: string | string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const isStepComplete = (stepIndex: number) => {
    const stepFields = steps[stepIndex - 1].fields;
    return stepFields.every(field => {
      const value = formData[field.label];
      return field.type === "checkbox" ? Array.isArray(value) && value.length > 0 : !!value;
    });
  };

  const isFormComplete = () => {
    return steps.every((_, index) => completedSteps.has(index + 1));
  };

  // const calculateResult = (): StartupData & { totalScore: number; category: string } => {
  //   const startupData: StartupData = {
  //     revenueGrowth: parseFloat(formData['Revenue Growth'] as string) || 0,
  //     marketDemand: parseFloat(formData['Market Demand'] as string) || 0,
  //     financialHealth: parseFloat(formData['Financial Health'] as string) || 0,
  //     teamStrength: parseFloat(formData['Team Strength'] as string) || 0,
  //     productViability: parseFloat(formData['Product Viability'] as string) || 0,
  //     operationalEfficiency: parseFloat(formData['Operational Efficiency'] as string) || 0,
  //     growthBarriers: parseFloat(formData['Growth Barriers'] as string) || 0,
  //     competitiveEdge: parseFloat(formData['Competitive Edge'] as string) || 0,
  //   };

  //   // Validate all inputs are numbers between 0-10
  //   const isValid = Object.values(startupData).every(
  //     (score) => typeof score === 'number' && score >= 0 && score <= 10
  //   );

  //   if (!isValid) {
  //     throw new Error('All scores must be numbers between 0 and 10');
  //   }

  //   // Get evaluation results
  //   const result = evaluateStartup(startupData);
    
  //   // Return combined data
  //   return { 
  //     ...startupData, 
  //     totalScore: result.totalScore,
  //     category: result.category 
  //   };
  // };




  const calculateResult = (): StartupData & { totalScore: number; category: string; details: any } => {
    const startupData: StartupData = {
      revenueGrowth: mapRevenueToScore(handleFormData(formData['Total revenue in the last 2 years?'])),
      marketDemand: mapCustomersToScore(handleFormData(formData['How many paying customers do you have?'])),
      financialHealth: handleFormData(formData['Is your startup currently profitable?']) === 'Yes' ? 10 : 5,
      teamStrength: handleFormData(formData['Does your core team have industry expertise?']) === 'Yes' ? 10 : 5,
      productViability: (handleFormData(formData['Do you have a Minimum Viable Product (MVP)?']) === 'Yes' && handleFormData(formData['Is your product/service currently in use?']) === 'Yes') ? 10 : 5,
      operationalEfficiency: mapOperationalChallengeToScore(handleFormData(formData['Biggest operational challenge?'])),
      growthBarriers: mapStruggleReasonToScore(handleFormData(formData['Primary reason for your startup’s struggle?'])),
      competitiveEdge: handleFormData(formData['Are you using emerging technologies?']) === 'Yes' ? 10 : 5,
    };
  
    // Validate all inputs are numbers between 0-10
    const isValid = Object.values(startupData).every(
      (score) => typeof score === 'number' && score >= 0 && score <= 10
    );
  
    if (!isValid) {
      throw new Error('All scores must be numbers between 0 and 10');
    }
  
    // Get evaluation results
    const result = evaluateStartup(startupData);
    
    // Return combined data
    return { 
      ...startupData, 
      totalScore: result.totalScore,
      category: result.category,
      details: result.details
    };
  };
  
  // Helper function to handle form data
  const handleFormData = (fieldValue: string | string[]): string => {
    if (Array.isArray(fieldValue)) {
      return fieldValue.join(', '); // Or handle it in a way that makes sense for your application
    }
    return fieldValue;
  };  



// Helper functions to map form data to scores
const mapRevenueToScore = (revenue: string): number => {
  switch (revenue) {
    case '>₹1Cr': return 10;
    case '₹50L-₹1Cr': return 8;
    case '₹10L-₹50L': return 6;
    case '<₹10L': return 4;
    case '₹0': return 0;
    default: return 0;
  }
};




const mapCustomersToScore = (customers: string): number => {
  switch (customers) {
    case '>100': return 10;
    case '51-100': return 8;
    case '11-50': return 6;
    case '1-10': return 4;
    case '0': return 0;
    default: return 0;
  }
};




const mapOperationalChallengeToScore = (challenge: string): number => {
  switch (challenge) {
    case 'Scaling': return 10;
    case 'Market Fit': return 8;
    case 'Funding': return 6;
    case 'Hiring': return 4;
    default: return 0;
  }
};






const mapStruggleReasonToScore = (reason: string): number => {
  switch (reason) {
    case 'Technology': return 10;
    case 'Market Fit': return 8;
    case 'Team': return 6;
    case 'Funding': return 4;
    case 'Legal': return 2;
    default: return 0;
  }
};











  const handleSubmit = async () => {
    if (isFormComplete()) {
      setIsSubmitting(true);
      setError(null);
      try {
        const result = calculateResult();
        setReportData(result);
        setReportVisible(true);
      } catch (error) {
        setError((error as Error).message);
        console.error('Error calculating result:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('Please complete all steps before submitting.');
    }
  };

  // Load sample data
  // const loadSampleData = () => {
  //   // Create sample data with all fields needed by the formula
  //   const sampleData: Record<string, string | string[]> = {
  //     'Revenue Growth': '10',
  //     'Market Demand': '10',
  //     'Financial Health': '10',
  //     'Team Strength': '10',
  //     'Product Viability': '8',
  //     'Operational Efficiency': '7',
  //     'Growth Barriers': '5',
  //     'Competitive Edge': '8',
  //     // Add any other fields required by your form
  //   };
    
  //   setFormData(sampleData);
  //   setCompletedSteps(new Set(Array.from({ length: totalSteps }, (_, i) => i + 1)));
  //   setActiveStep(totalSteps);
  // };

  useEffect(() => {
    // Update completed steps when active step changes
    if (activeStep === totalSteps && isStepComplete(totalSteps)) {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        newSet.add(totalSteps);
        return newSet;
      });
    }
  }, [activeStep, formData, totalSteps]);

  const currentStep = steps[activeStep - 1];
  const progressPercentage = Math.round(((activeStep - 1) / (totalSteps - 1)) * 100);
  const remainingPercentage = Math.round(((totalSteps - activeStep) / totalSteps) * 100);

  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-6xl mx-auto w-full">
      <div className="flex md:flex-col md:w-80 bg-gradient-to-r from-[#520000] via-[#710000] via-[#a50000] to-[#ce0000] rounded-r-lg text-white p-6">
        <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 my-auto overflow-x-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-4 justify-between">
              <span className={`text-lg ${step.id === activeStep ? "font-bold" : "opacity-80"}`}>
                {step.title}
              </span>
              <div
                className={`flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full ${
                  completedSteps.has(step.id) ? "bg-green-500 text-white" :
                  step.id === activeStep ? "bg-white border-[3px] border-green-400 text-green-400" : "bg-white shadow-lg text-gray-400"
                }`}
                style={{ zIndex: 100 }}
              >
                {completedSteps.has(step.id) ? <Check className="w-6 h-6" /> : step.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col items-center relative ml-0 md:-ml-16 lg:-ml-16">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-full max-w-3xl z-20">
            {error}
          </div>
        )}
        
        {reportVisible ? (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 pl-8 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Startup Evaluation Report</h2>
            {reportData ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold mb-2">Overall Result</div>
                  <div className="text-2xl font-bold text-red-600 mb-1">{reportData.totalScore.toFixed(2)}/100</div>
                  <div className="text-xl font-medium">{reportData.category}</div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Score Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Revenue Growth</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.revenueGrowth}/10</span>
                        <span>Weighted: {(reportData.revenueGrowth * 0.15).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Market Demand</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.marketDemand}/10</span>
                        <span>Weighted: {(reportData.marketDemand * 0.15).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Financial Health</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.financialHealth}/10</span>
                        <span>Weighted: {(reportData.financialHealth * 0.15).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Team Strength</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.teamStrength}/10</span>
                        <span>Weighted: {(reportData.teamStrength * 0.10).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Product Viability</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.productViability}/10</span>
                        <span>Weighted: {(reportData.productViability * 0.15).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Operational Efficiency</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.operationalEfficiency}/10</span>
                        <span>Weighted: {(reportData.operationalEfficiency * 0.10).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Growth Barriers</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.growthBarriers}/10</span>
                        <span>Weighted: {(reportData.growthBarriers * 0.10).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">Competitive Edge</div>
                      <div className="flex justify-between">
                        <span>Raw Score: {reportData.competitiveEdge}/10</span>
                        <span>Weighted: {(reportData.competitiveEdge * 0.10).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <FormDataDisplay data={formData} />
              </div>
            ) : (
              <p>No data available</p>
            )}
            <Button 
              onClick={() => setReportVisible(false)} 
              className="mt-6 bg-[#ff0000] hover:bg-red-700 text-white"
            >
              Back to Form
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 pl-8 relative z-10">
            {/* <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm text-gray-500">Approx Time: 2 Mins</h2>
              <Button 
                onClick={loadSampleData} 
                className="bg-blue-500 hover:bg-blue-700 text-white"
              >
                Fill with Sample Data
              </Button>
            </div> */}

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
                      min={0}
                      max={10}
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

            <div className="mt-8">
              <div className="w-full mb-4">
                <Progress value={progressPercentage} className="h-2 bg-gray-200" />
                <span className="text-xs text-gray-500 mt-1 inline-block">
                  {remainingPercentage}% Left
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious} 
                  className="border-red-500 hover:text-[#ff0000] text-red-500" 
                  disabled={activeStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> 
                  PREVIOUS
                </Button>

                {activeStep === totalSteps ? (
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-[#ff0000] hover:bg-red-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'SUBMIT'}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext} 
                    className="bg-[#ff0000] hover:bg-red-700"
                  >
                    NEXT
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div
          className="fixed right-20 top-0 z-0 bottom-0 w-1/3 h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/Artboard 1.svg')" }}
        ></div>
      </div>
    </div>
  );
}