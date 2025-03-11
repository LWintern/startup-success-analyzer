// pages/api/formdata.js

import { calculateScore } from '../../utils/formula';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect('mongodb://localhost:27017/stepperForm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define a schema and model for the form data
const formDataSchema = new mongoose.Schema({
  data: Object,
  score: Number,
});

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const formData = req.body;
      const score = calculateScore(formData);

      const newFormData = new FormData({ data: formData, score });
      await newFormData.save();
      res.status(201).json({ message: 'Form data saved successfully', score });
    } catch (error) {
      res.status(500).json({ error: 'Error saving form data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}