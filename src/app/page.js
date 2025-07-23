'use client';

import Head from "next/head";
import { 
  SignInButton, 
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/welcome');
  }, [router]);

  return (
    <>
      <SignedOut>
        <Head>
          <title>Welcome to Your Budget App</title>
          <meta
            name="description"
            content="Take control of your finances with our simple and intuitive budgeting app."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to BudgetBerry
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Plan, track, and achieve your financial goals with ease. Start
              managing your money today in a simple and intuitive way.
            </p>
            <SignInButton className="text-black cursor-pointer px-5"/>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
