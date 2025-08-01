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
import { prisma } from '@/lib/prisma' // You'll need to set this up
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()
  const [wallets, setWallets] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [transactions, setTransactions] = useState([])

  // Fetch user's wallets and transactions
  useEffect(() => {
    if (!user) return
    
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch wallets for current user
        const response = await fetch(`/api/wallets?userId=${user.id}`)
        const walletsData = await response.json()
        setWallets(walletsData)
        
        if (walletsData.length > 0) {
          setSelectedWallet(walletsData[0].id)
          // Fetch transactions for first wallet
          const transactionsResponse = await fetch(
            `/api/transactions?walletId=${walletsData[0].id}`
          )
          setTransactions(await transactionsResponse.json())
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wallets</h1>
      
      {/* Wallet Selection */}
      <div className="flex gap-4 mb-6">
        {wallets.map(wallet => (
          <div 
            key={wallet.id}
            className={`p-4 rounded-lg cursor-pointer ${
              selectedWallet === wallet.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedWallet(wallet.id)}
          >
            <h3>{wallet.name}</h3>
            <p>₱{wallet.totalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <h2 className="text-xl font-bold mb-3">Recent Transactions</h2>
      <div className="space-y-2">
        {transactions.map(transaction => (
          <div key={transaction.id} className="p-3 border rounded-lg">
            <div className="flex justify-between">
              <span>{transaction.description}</span>
              <span className={`${
                transaction.type === 'income' 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                ₱{transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}