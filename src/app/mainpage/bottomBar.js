import { CircleUser, Home, Layers, Plus } from 'lucide-react'; 
import Link from 'next/link';

export default function bottomBar() {
  return (
    <div style={{ backgroundColor: '#232532' }} className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-[#1e1e1e] flex justify-between items-center px-9 py-1 max-w-200 mx-auto rounded-full">
      
      {/* Home Button */}
      <Link href="/mainpage/homePage" className="flex flex-col items-center text-white text-xs">
        <Home className="w-8 h-8" />
        Home
      </Link>

      {/* Center Button */}
      <Link href="/mainpage/addTransactions" style={{ backgroundColor: '#C0C5D9' }} className="relative -top-0 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md border-0 border-[#1e1e1e]">
        <Plus className="w-8 h-8 text-black" />
      </Link>

      {/* Transactions Button */}
      <Link href="/mainpage/transactionsPage" className="flex flex-col items-center text-white text-xs">
        <Layers className="w-8 h-8" />
        Transactions
      </Link>

      {/* Transactions Button */}
      <Link href="/" className="flex flex-col items-center text-white text-xs">
        <CircleUser className="w-8 h-8" />
        Log Out
      </Link>
    </div>
  );
}