import { Field, Step } from "../types/stepperForm"

export const steps: Step[] = [
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
        { label: "Does your startup have a legal entity (Private Limited, LLP, etc.)?", type: "select", options: ["Yes", "No"] },
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
