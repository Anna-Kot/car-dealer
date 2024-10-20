'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Make } from '@/@types/carTypes';
import { yearsList } from '../consts/car';

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await axios.get<{ Results: Make[] }>(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        );
        setMakes(response.data.Results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMakes();
  }, []);

  const isNextAvailable = selectedMake !== '' && selectedYear !== '';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Vehicle Filter</h1>
        <div className="mb-4">
          <label htmlFor="make" className="block mb-2 font-semibold">
            Vehicle Make
          </label>
          <select
            id="make"
            value={selectedMake}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedMake(e.target.value)
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select a make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-8">
          <label htmlFor="year" className="block mb-2 font-semibold">
            Model Year
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedYear(e.target.value)
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select a year</option>
            {yearsList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link
          href={
            isNextAvailable ? `/result/${selectedMake}/${selectedYear}` : '#'
          }
          className={`block w-full p-2 text-center text-white rounded ${
            isNextAvailable
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
