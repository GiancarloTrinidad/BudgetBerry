'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AddTransactions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const selectedCategory = searchParams.get('category');
    const selectedType = searchParams.get('type');

    if (selectedCategory) setCategory(selectedCategory);
    if (selectedType) setType(selectedType);
  }, [searchParams]);

  const handleAdd = async () => {
    if (!amount || !category || !type) {
      alert('Please enter amount and select category');
      return;
    }

    const newTransaction = {
      amount: parseFloat(amount),
      label: category,
      type,
    };

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        router.push('/transactions');
      } else {
        alert('Failed to add transaction');
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  return (
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-[#1f1f1f] text-white p-4">
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-[#1f1f1f] text-white p-4 max-w-200 mx-auto w-full">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.push('/mainpage/homePage')} className="text-xl mr-2">{`←`}</button>
        <h1 className="text-xl font-bold">Add Transactions</h1>
      </div>

      {/* Amount Input */}
      <div className="text-4xl font-semibold mb-6 border-b border-white pb-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-transparent outline-none w-full text-white"
        />
      </div>

      {/* Category Display Button */}
        <div className="flex gap-4 mb-12 mx-auto w-full">
            {/* Select Category Button */}
            <button
                onClick={() => router.push('/mainpage/selectCategory')}
                className="bg-[#C3C8E3] text-black rounded-xl px-4 py-3 w-1/2 font-semibold"
            >
                {category || 'Select Category'}
            </button>

            {/* Add Transaction Button */}
            <button
                onClick={handleAdd}
                className="bg-[#C3C8E3] text-black rounded-xl px-4 py-3 w-1/2 font-semibold"
            >
                Add Transaction
            </button>
            </div>
      </div>
    </div>
  );
}
