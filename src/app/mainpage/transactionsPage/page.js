'use client'; // Only needed in App Router

import BottomBar from '../bottomBar'; // Adjust path if necessary

export default function Transactions() {
  const transactions = [
    { id: 1, amount: -79.31, label: 'Groceries' },
    { id: 2, amount: -500.0, label: 'Send Money' },
    { id: 3, amount: 1000.0, label: 'Loan' },
  ];

  return (
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen text-white pb-24 p-4">
      <div className="w-full max-w-200 mx-auto mb-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      </div>

      <div className="flex flex-col space-y-4 max-w-200 w-full mx-auto">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-[#C3C8E3] rounded-xl p-4"
          >
            <p
              className={`text-2xl font-bold ${
                tx.amount < 0 ? 'text-red-600' : 'text-green-500'
              }`}
            >
              {tx.amount < 0 ? `-${Math.abs(tx.amount).toFixed(2)}` : `+${tx.amount.toFixed(2)}`}
            </p>
            <p className="text-black font-semibold">{tx.label}</p>
          </div>
        ))}
      </div>

      <BottomBar />
    </div>
  );
}
