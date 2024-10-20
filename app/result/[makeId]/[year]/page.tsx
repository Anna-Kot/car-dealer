import { Suspense } from 'react';
import axios from 'axios';

import ResultView from '@/components/ResultView';
import { Make, ResultPageProps } from '@/@types/carTypes';
import { years } from '../../../../consts/car';

export async function generateStaticParams() {
  try {
    const makesData = await axios.get<{ Results: Make[] }>(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );
    const makes = makesData.data.Results;
    const topMakes = makes.slice(0, 7);
    const topYears = years.slice(0, 3);

    return topMakes.flatMap((make) =>
      topYears.map((year) => ({
        makeId: make.MakeId.toString(),
        year: year,
      }))
    );
  } catch (error) {
    console.error('generateStaticParams', error);
    return [];
  }
}

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <Suspense fallback={<div>Loading ....</div>}>
      <ResultView makeId={params.makeId} year={params.year} />
    </Suspense>
  );
}
