import { Model, ModelsListProps } from '@/@types/carTypes';
import React from 'react';

const ModelsList: React.FC<ModelsListProps> = ({ models }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Available Models:</h2>
      {models.length > 0 ? (
        <ul className="space-y-2">
          {models.map((model: Model) => (
            <li
              key={model.Model_ID + model.Model_Name}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 bg-gray-50 p-4 rounded-lg">
          No models found for this params
        </p>
      )}
    </div>
  );
};

export default ModelsList;
