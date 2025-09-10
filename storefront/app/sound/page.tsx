import React from 'react';

interface TonalProfile {
  id: number;
  instrument_id: number;
  axis_x: number;
  axis_y: number;
  projection: number;
  response: number;
  clarity: number;
}

async function getProfiles(): Promise<TonalProfile[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ERP_API}/api/sounds/search`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.profiles as TonalProfile[];
  } catch {
    return [];
  }
}

/**
 * Browse instruments by sound profile. Fetches tonal profiles from the ERP
 * and displays them in a table. In a future iteration clicking a row
 * should play a sample of the instrument's sound.
 */
export default async function SoundPage() {
  const profiles = await getProfiles();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Browse by Sound</h1>
      <p className="text-gray-600">
        Explore instruments by tonal characteristics. Click a row to hear samples.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">ID</th>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">
                Instrument ID
              </th>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">
                Dark→Bright
              </th>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">
                Mellow→Brilliant
              </th>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">
                Projection
              </th>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">
                Response
              </th>
              <th scope="col" className="px-3 py-2 text-left font-medium text-gray-700">
                Clarity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-3 py-2">{p.id}</td>
                <td className="px-3 py-2">{p.instrument_id}</td>
                <td className="px-3 py-2">{p.axis_x.toFixed(2)}</td>
                <td className="px-3 py-2">{p.axis_y.toFixed(2)}</td>
                <td className="px-3 py-2">{p.projection.toFixed(2)}</td>
                <td className="px-3 py-2">{p.response.toFixed(2)}</td>
                <td className="px-3 py-2">{p.clarity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}