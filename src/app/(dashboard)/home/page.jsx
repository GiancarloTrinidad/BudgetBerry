"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AddTransactionDialog from '../_components/AddTransactionDialog';
import { useQuery } from '@tanstack/react-query';
import { getWallets, CreateInitialWallets } from '../_actions/wallets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SignedIn, SignedOut, UserButton, useUser, SignInButton, SignUpButton, currentUser } from "@clerk/nextjs";

export default function Home() {
  const {user, isLoaded} = useUser()
  const router = useRouter(); 
  const [selectedWalletId, setSelectedWalletId] = useState(null)

  const walletQuery = useQuery({
    queryKey:["wallets"],
    queryFn: async () => {
      if (isLoaded && user) {
        try {
          await CreateInitialWallets();
          return await getWallets();
        } catch (error) {
          console.error("Error creating or fetching wallets:", error);
          toast.error("Failed to load wallets. Please try again.");
          return [];
        }
      } 
      return []
    },
    enabled: isLoaded && !!user
  })

  const wallets = walletQuery.data || [];

  // Set 1st wallet as default
  useEffect(() => {
        if (wallets.length > 0 && !selectedWalletId) {
            setSelectedWalletId(wallets[0].id);
        }
    }, [wallets, selectedWalletId]);

  const selectedWallet = wallets.find(w => w.id === selectedWalletId);

  if (!isLoaded || walletQuery.isLoading) {
        return (
            <div className="h-full bg-background flex flex-col items-center p-4 md:p-8 space-y-8">
                <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                </div>
                <Skeleton className="h-48 w-full max-w-4xl rounded-xl" />
                <Skeleton className="h-48 w-full max-w-4xl rounded-xl" />
                <Skeleton className="h-32 w-full max-w-4xl rounded-lg" />
            </div>
        );
    }

  return (
    <div className="h-full bg-background">
      <div className="hidden border-b bg-card md:block">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold mx-24">Hello, {user?.firstName}!</p>
          <div className="flex items-center gap-3">
            <AddTransactionDialog 
              trigger={
                <Button variant={ "outline" }>
                    New Transaction 
                </Button>}
              walletId={selectedWalletId}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center p-4 md:p-8 space-y-8">
          <div className="w-full max-w-4xl flex justify-between items-center gap-6">
              <h2 className="text-2xl font-semibold">Your Wallets</h2>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
              {wallets.length > 0 && wallets.map(wallet => (
                  <Card
                      key={wallet.id}
                      className={cn("cursor-pointer transition-all", {
                          "bg-primary text-primary-foreground": wallet.id === selectedWalletId,
                          "bg-card text-card-foreground": wallet.id !== selectedWalletId,
                      })}
                      onClick={() => setSelectedWalletId(wallet.id)}
                  >
                      <CardHeader>
                          <CardTitle>{wallet.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <CardDescription className={cn("text-2xl font-bold", {
                              "text-primary-foreground": wallet.id === selectedWalletId
                          })}>
                              {wallet.totalAmount !== null ? `₱ ${wallet.totalAmount.toFixed(2)}` : '...'}
                          </CardDescription>
                      </CardContent>
                  </Card>
              ))}
          </div>

          {selectedWallet && (
              <>
                  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="flex-1 bg-green-500 text-white shadow-lg">
                          <CardHeader>
                              <CardTitle>Income</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <CardDescription className="text-3xl font-bold text-white">
                                  ₱ {selectedWallet.income.toFixed(2)}
                              </CardDescription>
                          </CardContent>
                      </Card>
                      <Card className="flex-1 bg-red-500 text-white shadow-lg">
                          <CardHeader>
                              <CardTitle>Expenses</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <CardDescription className="text-3xl font-bold text-white">
                                  ₱ {selectedWallet.expense.toFixed(2)}
                              </CardDescription>
                          </CardContent>
                      </Card>
                  </div>

                  <Card className="w-full max-w-4xl p-6 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold">Budget</h2>
                          <Link href="/mainpage/changeBudget" className="text-sm text-primary underline">Change Budget</Link>
                      </div>
                      <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  </Card>
              </>
          )}
      </div>
    </div>
  );
}
