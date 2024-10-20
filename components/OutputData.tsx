import { OutputProp } from '@/@types/carTypes';
import React from 'react';

const OutputData: React.FC<OutputProp> = ({ makeName, year }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <p className="mb-2">
        <span className="font-semibold text-gray-700">Make:</span>{' '}
        <span className="text-blue-600">{makeName}</span>
      </p>
      <p>
        <span className="font-semibold text-gray-700">Year:</span>{' '}
        <span className="text-blue-600">{year}</span>
      </p>
    </div>
  );
};

export default OutputData;
