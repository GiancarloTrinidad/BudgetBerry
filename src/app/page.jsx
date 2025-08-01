'use client';

import Head from "next/head";
import { 
  SignInButton, 
  SignUpButton,
  // SignedIn,
  SignedOut,
  // UserButton, this might be useful for user.
  useUser
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BerryLogo from "@/components/BerryLogo";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  // Redirect to /home if signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/home');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <main>
      <Head>
        <title>Welcome to BudgetBerry</title>
        <meta
          name="description"
          content="Take control of your finances with our simple and intuitive budgeting app."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SignedOut>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
          <BerryLogo />
          <div className="max-w-2xl text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span>Welcome to </span>
              <span style={{ color: '#388C3C' }}>Budget</span>
              <span style={{ color: '#FE4081' }}>Berry</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Plan, track, and achieve your financial goals with ease. Start
              managing your money today in a simple and intuitive way.
            </p>
            <div className="flex gap-4 justify-center">
              <SignInButton>
                <button className="bg-white text-gray-800 border border-gray-300 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#FE4081] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </SignedOut>

      {/* Loading state while checking auth status */}
      {isLoaded && isSignedIn && (
        <div className="min-h-screen flex items-center justify-center">
          <p>Redirecting to your dashboard...</p>
        </div>
      )}
    </main>
  );
}