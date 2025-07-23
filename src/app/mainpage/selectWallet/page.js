'use client';
import { useRouter } from 'next/navigation';

export default function SelectWallet() {
  const router = useRouter();

  const handleSelectWallet = (walletName) => {
    // Pass selected wallet back to previous page (you can handle via query param or state management)
    router.push(`/add-transactions?wallet=${encodeURIComponent(walletName)}`);
  };

  return (
    <div style={{ backgroundColor: '#282828' }} className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-8">Select Wallet</h1>

      {/* <button
        onClick={() => handleSelectWallet('Wallet 1')}
        className="bg-[#C3C8E3] text-black font-semibold px-6 py-3 rounded-xl mb-4 w-40"
      >
        Wallet 1
      </button> */} 

      {/*temporary lang*/ }

      <button
        style={{ backgroundColor: '#C0C5D9' }}
        onClick={() => router.push('/mainpage/homePage')}
        className="bg-[#C3C8E3] text-black font-semibold px-6 py-3 rounded-xl mb-4 w-40"
      >
        Wallet 1
      </button>

      <button
        style={{ backgroundColor: '#C0C5D9' }}
        onClick={() => handleSelectWallet('Wallet 2')}
        className="bg-[#C3C8E3] text-black font-semibold px-6 py-3 rounded-xl w-40"
      >
        Wallet 2
      </button>
    </div>
  );
}
