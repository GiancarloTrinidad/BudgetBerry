'use client'; // Only needed if you're using App Router

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function changeBudget() {
  const router = useRouter();
  const [budget, setBudget] = useState('');

  const changeBudget = () => {
    // Placeholder: Save the new budget (send to backend or context)
    alert(`New budget: ${budget}`);
    // Optionally redirect or close modal
  };

  return (
     <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-[#1f1f1f] text-white p-4">
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-[#1f1f1f] text-white p-4 max-w-200 mx-auto w-full">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-xl font-bold mr-2"
        >
          ←
        </button>
        <h1 className="text-lg font-bold">Change Budget</h1>
      </div>

      {/* Input Field */}
      <input
        type="number"
        placeholder="0"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="w-full text-white bg-transparent border-b border-gray-400 text-4xl font-bold mb-6 outline-none"
      />

      {/* Submit Button */}
      <button
        // onClick={changeBudget} uncomment once backend integration solution is found possible
        onClick={() => router.push('/mainpage/homePage')}
        className="w-full bg-[#C3C8E3] text-black py-3 rounded-xl font-semibold"
      >
        Submit
      </button>
    </div>
    </div>
  );
}
