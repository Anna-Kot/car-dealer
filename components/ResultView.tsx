'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Make, Model, ResultViewProps } from '@/@types/carTypes';
import LinkBack from './LinkBack';
import OutputData from './OutputData';
import ModelsList from './ModelsList';

export default function ResultView({ makeId, year }: ResultViewProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [makeName, setMakeName] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const makeResponse = await axios.get<{ Results: Make[] }>(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const make = makeResponse.data.Results.find(
        (m) => m.MakeId.toString() === makeId
      );
      if (make) {
        setMakeName(make.MakeName);
      }

      const modelsResponse = await axios.get<{ Results: Model[] }>(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );
      setModels(modelsResponse.data.Results);
    } catch (error) {
      console.error(error);
      setError('Error (loading models). Try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [makeId, year]);
  if (loading) return <div>Loading ...</div>;

  if (error)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <p className="text-center text-red-500 mb-4">{error}</p>
          <LinkBack />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Car Models:</h1>
        <OutputData makeName={makeName} year={year} />
        <ModelsList models={models} />
        <LinkBack />
      </div>
    </div>
  );
}
