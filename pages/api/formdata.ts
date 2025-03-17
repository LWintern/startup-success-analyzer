import { evaluateStartup } from '../../utils/formula';

// Define the type for the startup data
type StartupData = {
  revenueGrowth: number;
  marketDemand: number;
  financialHealth: number;
  teamStrength: number;
  productViability: number;
  operationalEfficiency: number;
  growthBarriers: number;
  competitiveEdge: number;
};

// Define the type for the response data
type ResponseData = {
  message: string;
  formData: Record<string, any>;
  totalScore: number;
  category: string;
};

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      // Validate input
      if (!formData || typeof formData !== 'object') {
        return res.status(400).json({ error: 'Invalid form data' });
      }

      // Prepare data for the evaluateStartup function
      const startupData: StartupData = {
        revenueGrowth: parseInt(formData['Revenue Growth']) || 0,
        marketDemand: parseInt(formData['Market Demand']) || 0,
        financialHealth: parseInt(formData['Financial Health']) || 0,
        teamStrength: parseInt(formData['Team Strength']) || 0,
        productViability: parseInt(formData['Product Viability']) || 0,
        operationalEfficiency: parseInt(formData['Operational Efficiency']) || 0,
        growthBarriers: parseInt(formData['Growth Barriers']) || 0,
        competitiveEdge: parseInt(formData['Competitive Edge']) || 0,
      };

      // Evaluate the startup using the new function
      const { totalScore, category } = evaluateStartup(startupData);

      // Respond with the entire form data, the calculated score, and the category
      const responseData: ResponseData = {
        message: 'Form data received',
        formData,
        totalScore,
        category
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error processing form data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}