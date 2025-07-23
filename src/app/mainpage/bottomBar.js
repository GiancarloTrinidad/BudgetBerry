import { Home, Layers, Plus } from 'lucide-react'; 
import Link from 'next/link';

export default function bottomBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#1e1e1e] flex justify-between items-center px-6 py-3">
      
      {/* Home Button */}
      <Link href="/mainpage/homePage" className="flex flex-col items-center text-white text-xs">
        <Home className="w-6 h-6" />
        Home
      </Link>

      {/* Center Button */}
      <Link href="/add" className="relative -top-6 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md border-4 border-[#1e1e1e]">
        <Plus className="w-8 h-8 text-black" />
      </Link>

      {/* Transactions Button */}
      <Link href="/mainpage/transactionsPage" className="flex flex-col items-center text-white text-xs">
        <Layers className="w-6 h-6" />
        Transactions
      </Link>
    </div>
  );
}