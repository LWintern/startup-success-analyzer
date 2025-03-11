// Define types for the fields and steps
export type Field = {
    label: string
    type: "text" | "number" | "dropdown" | "select" | "checkbox"
    options?: string[]
  }
  
  export type Step = {
    id: number
    title: string
    fields: Field[]
  }