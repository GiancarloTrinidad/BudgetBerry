// import BottomBar from "../bottomBar";

// export default function homePage() {
//   return (
//     <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-black text-white pb-20">
//       <h1 className="text-3xl font-bold p-4">Home</h1>
//       {/* Content */}
//       <BottomBar />
//     </div>
//   );
// }
'use client'; // Only if using App Router (optional in Pages Router)

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomBar from "../bottomBar"; // Adjust the import if needed

export default function Home() {
  const [balance, setBalance] = useState(null);

  // Simulate fetching from backend
  useEffect(() => {
    // Replace this with an actual fetch call
    const fetchBalance = async () => {
      const fetchedBalance = 420.69; // Replace with real backend value
      setBalance(fetchedBalance);
    };

    fetchBalance();
  }, []);

  return (
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen text-white pb-24 p-4">
      {/* Header */}
      <div className="text-sm text-gray-300">
        <Link href="/mainpage/selectWallet">
          <span className="hover:text-blue-400 cursor-pointer">Wallet 1</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Home</h1>

      {/* Balance Display */}
      <div className="mb-6">
        <p className="text-md text-gray-300">Balance</p>
        <p className="text-4xl font-semibold">{balance !== null ? balance.toFixed(2) : 'Loading...'}</p>
      </div>

      {/* Monthly Report */}
      <div className="bg-[#C3C8E3] text-black rounded-xl p-4 mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Budget</h2>
          <button className="text-sm underline">Change Budget</button>
        </div>

        {/* Placeholder Graph */}
        <div className="h-24 bg-black"></div>
      </div>

      {/* Bottom Navigation */}
      <BottomBar />
    </div>
  );
}