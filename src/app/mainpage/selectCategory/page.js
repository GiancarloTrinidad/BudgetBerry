'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const expenseCategories = ['Groceries', 'Food and Drinks', 'Medicine', 'Send Money', 'Utilities'];
const incomeCategories = ['Incoming Transfer', 'Loan', 'Other Income'];

export default function SelectCategory() {
  const router = useRouter();
  const [type, setType] = useState('Expense');

  const categories = type === 'Expense' ? expenseCategories : incomeCategories;

  const handleSelect = (category) => {
    // router.push(`/add-transactions?category=${encodeURIComponent(category)}&type=${type}`); maybe edit later for backend integration -trips
    router.push('/mainpage/addTransactions');
  };

  return (
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.push('/mainpage/addTransactions')} className="text-xl mr-2">{`←`}</button>
        <h1 className="text-xl font-bold">Select Category</h1>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setType('Expense')}
          className={`px-4 py-2 rounded-md font-semibold ${
            type === 'Expense' ? 'bg-[#C3C8E3] text-black' : 'bg-gray-800'
          }`}
        >
          Expense
        </button>
        <button
          onClick={() => setType('Income')}
          className={`px-4 py-2 rounded-md font-semibold ${
            type === 'Income' ? 'bg-[#C3C8E3] text-black' : 'bg-gray-800'
          }`}
        >
          Income
        </button>
      </div>

      <h2 className="text-lg font-bold mb-4">{type}</h2>

      {/* Category Buttons */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className="bg-[#C3C8E3] text-black w-full rounded-xl px-4 py-3 font-semibold"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
