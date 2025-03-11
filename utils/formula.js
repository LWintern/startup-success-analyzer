// utils/formula.js

/**
 * Example formula function that calculates a score based on form data.
 * @param {Object} data - The form data.
 * @returns {number} - The calculated score.
 */
export function calculateScore(data) {
    // Example formula: sum of certain numeric fields
    const { field1, field2, field3 } = data;
  
    // Ensure fields are numbers
    const num1 = parseFloat(field1) || 0;
    const num2 = parseFloat(field2) || 0;
    const num3 = parseFloat(field3) || 0;
  
    // Example calculation
    const score = num1 + num2 * 2 + num3 * 3;
  
    return score;
  }