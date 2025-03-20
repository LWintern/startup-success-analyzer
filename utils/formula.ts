// utils/formula.ts

import {StartupData } from "../types/formula";

/* @returns {Object} - An object with the calculated total score and category.*/

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

    // Calculate weighted scores
    const revenueGrowthScore = revenueGrowth * 0.15;
    const marketDemandScore = marketDemand * 0.5;
    const financialHealthScore = financialHealth * 0.15;
    const teamStrengthScore = teamStrength * 0.10;
    const productViabilityScore = productViability * 0.15;
    const operationalEfficiencyScore = operationalEfficiency * 0.10;
    const growthBarriersScore = growthBarriers * 0.10;
    const competitiveEdgeScore = competitiveEdge * 0.10;

    // Calculate total weighted score 
    const weightedTotalScore = revenueGrowthScore + marketDemandScore + financialHealthScore
                              + teamStrengthScore + productViabilityScore + operationalEfficiencyScore
                              +  growthBarriersScore + competitiveEdgeScore;

      // Scale the weighted total score to a 100-point scale
      const scaledTotalScore = weightedTotalScore * 10;

      // Ensure a minimum score of 29 
      const finalTotalScore = Math.max(scaledTotalScore, 29);

      // Determine the cateogry based on the final total score
      let category;
      if(finalTotalScore >= 85){
        category = "Scaling & Growth Ready";
      } else if (finalTotalScore >=70){
        category = "Fundamentally Strong but Stagnant";
      } else if (finalTotalScore >=50){
        category = "Restart with Support Needed";
      } else if (finalTotalScore >= 30) {
        category = "High-Risk but Recoverable";
      } else {
        category = "Critical State = Requires a Complete Reboot";
      }

      // Round the final total score to two decimal places
      const roundedTotalScore = Number(finalTotalScore.toFixed(20));

      return {
        totalScore: roundedTotalScore, 
        category, 
        details:{
          revenueGrowthScore, 
          marketDemandScore,
          financialHealthScore,
          teamStrengthScore,
          productViabilityScore,
          operationalEfficiencyScore,
          growthBarriersScore,
          competitiveEdgeScore

        }
      }
      }
    