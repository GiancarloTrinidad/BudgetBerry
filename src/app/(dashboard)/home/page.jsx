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
import { TrendingUp } from 'lucide-react';

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
    <div className="h-full bg-background ">
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

      <div className="flex-1 w-full">
        <div className="container mx-auto py-8 px-4 md:px-8 flex flex-col items-center">
          <div className="w-full max-w-6xl flex flex-col space-y-8">
            
            {/* Wallet Section */}
              <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Your Wallets</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wallets.map(wallet => (
                  <Card
                    key={wallet.id}
                    className={cn(
                      "cursor-pointer transition-all border-2 shadow-sm hover:shadow-md",
                      {
                        "border-primary shadow-md": wallet.id === selectedWalletId,
                        "border-muted": wallet.id !== selectedWalletId,
                      }
                    )}
                    onClick={() => setSelectedWalletId(wallet.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">{wallet.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={cn("text-2xl font-bold", {
                        "text-primary": wallet.id === selectedWalletId
                      })}>
                        {wallet.totalAmount !== null 
                          ? `₱ ${wallet.totalAmount.toFixed(2)}` 
                          : '...'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          
          {/* Financial Overview */}
            {selectedWallet && (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-foreground">Overview</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Income Card */}
                  <Card className="bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-green-500">Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        ₱ {selectedWallet.income.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Expenses Card */}
                  <Card className="bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-red-500">Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        ₱ {selectedWallet.expense.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Budget Section */}
                <Card className="border">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">Budget</CardTitle>
                      <Button asChild variant="link" className="text-primary px-0">
                        <Link href="/mainpage/changeBudget">Change Budget</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Budget visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
