'use client'; // Only needed in App Router

import BottomBar from '../../../components/Navbar'; // Adjust path if necessary
import TransactionTable from './_components/TransactionTable';
import { useState, useEffect } from 'react';
import { getWallets } from '../_actions/wallets';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

export default function Transactions() {
  const [selectedWalletId, setSelectedWalletId] = useState(null);
  
  // Fetch wallets
  const walletQuery = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      try {
        return await getWallets();
      } catch (error) {
        console.error("Error fetching wallets:", error);
        toast.error("Failed to load wallets. Please try again.");
        return [];
      }
    }
  });

  const wallets = walletQuery.data || [];

  // Set initial wallet selection
  useEffect(() => {
    if (wallets.length > 0 && !selectedWalletId) {
      setSelectedWalletId(wallets[0].id);
    }
  }, [wallets, selectedWalletId]);

  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold mx-24">Transactions History</p>
          </div>
          
            {/* Wallet Selector */}
            {walletQuery.isLoading ? (
              <Skeleton className="w-48 h-10 rounded-md" />
            ) : (
              <Select 
                value={selectedWalletId} 
                onValueChange={setSelectedWalletId}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map(wallet => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      {wallet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
        </div>
      </div>

      <div className="container">
        <TransactionTable walletId={selectedWalletId} />
      </div>
    </>
  );
}
