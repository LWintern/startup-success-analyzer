// src/components/customComponents/FormDataDisplay.tsx

import React from 'react';

interface FormDataDisplayProps {
  data: Record<string, string | string[]>;
}

const FormDataDisplay: React.FC<FormDataDisplayProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submitted Form Data</h2>
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-semibold">{key}:</span>
            <span>{Array.isArray(value) ? value.join(', ') : value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormDataDisplay;