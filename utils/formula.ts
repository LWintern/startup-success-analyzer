// utils/formula.ts
import { StartupData } from '../types/formula';

/**
 * Calculates the total score for a startup based on the generic scoring system.
 * @param {StartupData} startupData - An object containing the startup's data.
 * @returns {Object} - An object with the calculated total score and category.
 */
export function evaluateStartup(startupData: StartupData) {
  // Extract scores from the input data
  const {
    revenueGrowth,
    marketDemand,
    financialHealth,
    teamStrength,
    productViability,
    operationalEfficiency,
    growthBarriers,
    competitiveEdge
  } = startupData;

  // Validate input data
  const parameters = [
    revenueGrowth, marketDemand, financialHealth, teamStrength,
    productViability, operationalEfficiency, growthBarriers, competitiveEdge
  ];

  if (parameters.some(score => typeof score !== 'number' || score < 0 || score > 10)) {
    throw new Error('All scores must be numbers between 0 and 10');
  }

  // Calculate weighted scores
  const revenueGrowthScore = revenueGrowth * 0.15;
  const marketDemandScore = marketDemand * 0.15;
  const financialHealthScore = financialHealth * 0.15;
  const teamStrengthScore = teamStrength * 0.10;
  const productViabilityScore = productViability * 0.15;
  const operationalEfficiencyScore = operationalEfficiency * 0.10;
  const growthBarriersScore = growthBarriers * 0.10;
  const competitiveEdgeScore = competitiveEdge * 0.10;

  // Calculate total score
  const totalScore = revenueGrowthScore + marketDemandScore + financialHealthScore +
                     teamStrengthScore + productViabilityScore + operationalEfficiencyScore +
                     growthBarriersScore + competitiveEdgeScore;

  // Determine the category based on the total score
  let category;
  if (totalScore >= 0.85) {
    category = 'Scaling & Growth Ready';
  } else if (totalScore >= 0.70) {
    category = 'Fundamentally Strong but Stagnant';
  } else if (totalScore >= 0.50) {
    category = 'Restart with Support Needed';
  } else if (totalScore >= 0.30) {
    category = 'High-Risk but Recoverable';
  } else {
    category = 'Critical State - Requires a Complete Reboot';
  }

  // Round the total score to two decimal places
  const roundedTotalScore = Number(totalScore.toFixed(2));

  return {
    totalScore: roundedTotalScore * 100, // Convert to a score out of 100
    category
  };
}