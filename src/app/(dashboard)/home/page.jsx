'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomBar from '../../../components/Navbar'; 
import { useRouter } from 'next/navigation';
import { 
  SignInButton, 
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState(1); // 1 or 2
  const [wallet1Balance, setWallet1Balance] = useState(null);
  const [wallet2Balance, setWallet2Balance] = useState(null);
  const [income, setIncome] = useState(1000.00);
  const [expenses, setExpenses] = useState(579.31);
  const router = useRouter();



  // Simulate backend fetch
  useEffect(() => {
    const fetchBalances = async () => {
      // Replace with real API calls
      setWallet1Balance(420.69);
      setWallet2Balance(0.0);
    };

    fetchBalances();
  }, []);

  // Get balance based on selected wallet
  const currentBalance =
    selectedWallet === 1 ? wallet1Balance : wallet2Balance;

  return (
    <>
    <div
      style={{ backgroundColor: '#282828' }}
      className="min-h-screen text-white pb-24 p-4"
    >
      <div className="w-full max-w-200 mx-auto mb-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      </div>

    <div className="flex justify-center items-center gap-4 mb-6 w-full">
    {/* Wallet Toggle Buttons */}
      <div className="flex gap-4 mb-6 max-w-200 w-full">
        {/* Wallet 1 */}
        <button
          onClick={() => setSelectedWallet(1)}
          className={`w-98 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
            selectedWallet === 1
              ? 'bg-[#C3C8E3] text-black'
              : 'bg-[#1E1E2F] text-white'
          }`}
        >
          <span className="text-sm mb-1 font-medium">Wallet 1</span>
          <span className="text-2xl font-bold">
            {wallet1Balance !== null ? wallet1Balance.toFixed(2) : '...'}
          </span>
        </button>

        {/* Wallet 2 */}
        <button
          onClick={() => setSelectedWallet(2)}
          className={`w-98 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
            selectedWallet === 2
              ? 'bg-[#C3C8E3] text-black'
              : 'bg-[#1E1E2F] text-white'
          }`}
        >
          <span className="text-sm mb-1 font-medium">Wallet 2</span>
          <span className="text-2xl font-bold">
            {wallet2Balance !== null ? wallet2Balance.toFixed(2) : '...'}
          </span>
        </button>
      </div>
    </div> 

      {/* Income and Expenses Display */}
      <div className="flex justify-center items-center gap-4 mb-6 w-full bg-[#1E1E2F] max-w-200 mx-auto rounded-xl">
        {/* Income */}
        <div className="w-98 rounded-xl p-4 bg-[#1E1E2F] flex flex-col items-center justify-center">
          <span className="text-sm mb-1 font-medium text-white">Income</span>
          <span className="text-2xl font-bold text-green-400">
            ₱ {income.toFixed(2)}
          </span>
        </div>

        {/* Expenses */}
        <div className="w-98 rounded-xl p-4 bg-[#1E1E2F] flex flex-col items-center justify-center">
          <span className="text-sm mb-1 font-medium text-white">Expenses</span>
          <span className="text-2xl font-bold text-red-400">
            ₱ {expenses.toFixed(2)}
          </span>
        </div>
      </div>


      {/* Monthly Report */}
      <div className="bg-[#C3C8E3] text-black rounded-xl p-4 mb-8 max-w-200 mx-auto w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Budget</h2>
          <button onClick={() => router.push('/mainpage/changeBudget')} className="text-sm underline">Change Budget</button>
        </div>
        {/* Placeholder Graph */}
        <div className="h-24 bg-black"></div>
      </div>
    </div>
    </>
  );
}
