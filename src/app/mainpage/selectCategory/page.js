'use client';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Utensils,
  Pill,
  Send,
  Plug,
  Banknote,
  HandCoins,
  DollarSign,
  Heart
} from 'lucide-react'; // import icons

export default function SelectCategory() {
  const router = useRouter();

  const expenseCategories = [
    { label: 'Groceries', icon: <ShoppingCart className="w-5 h-5 mr-3" /> },
    { label: 'Food and Drinks', icon: <Utensils className="w-5 h-5 mr-3" /> },
    { label: 'Medicine', icon: <Pill className="w-5 h-5 mr-3" /> },
    { label: 'Fun Money', icon: <Heart className="w-5 h-5 mr-3" /> },
    { label: 'Send Money', icon: <Send className="w-5 h-5 mr-3" /> },
    { label: 'Utilities', icon: <Plug className="w-5 h-5 mr-3" /> },
  ];

  const incomeCategories = [
    { label: 'Incoming Transfer', icon: <Banknote className="w-5 h-5 mr-3" /> },
    { label: 'Loan', icon: <HandCoins className="w-5 h-5 mr-3" /> },
    { label: 'Other Income', icon: <DollarSign className="w-5 h-5 mr-3" /> },
  ];

  const handleSelect = (category) => {
    // For backend integration: `/add-transactions?category=${encodeURIComponent(category)}&type=...`
    router.push('/mainpage/addTransactions');
  };

  return (
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen text-white p-4">
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen text-white p-4 max-w-200 mx-auto w-full">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.push('/mainpage/addTransactions')} className="text-xl mr-2">{`←`}</button>
        <h1 className="text-xl font-bold">Select Category</h1>
      </div>

      {/* Expenses */}
      <h2 className="text-lg font-bold mb-3">Expenses</h2>
      <div className="space-y-3 mb-6">
        {expenseCategories.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSelect(item.label)}
            className="bg-[#C3C8E3] text-black w-full rounded-xl px-4 py-3 font-semibold flex items-center"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Income */}
      <h2 className="text-lg font-bold mb-3">Income</h2>
      <div className="space-y-3">
        {incomeCategories.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSelect(item.label)}
            className="bg-[#C3C8E3] text-black w-full rounded-xl px-4 py-3 font-semibold flex items-center"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
