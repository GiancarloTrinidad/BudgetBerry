import { Home, Layers, Plus } from 'lucide-react'; 
import Link from 'next/link';

export default function bottomBar() {
  return (
    <div style={{ backgroundColor: '#232532' }} className="fixed bottom-0 left-0 w-full bg-[#1e1e1e] flex justify-between items-center px-6 py-3">
      
      {/* Home Button */}
      <Link href="/mainpage/homePage" className="flex flex-col items-center text-white text-xs">
        <Home className="w-12 h-12" />
        Home
      </Link>

      {/* Center Button */}
      <Link href="/mainpage/addTransactions" style={{ backgroundColor: '#C0C5D9' }} className="relative -top-0 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md border-0 border-[#1e1e1e]">
        <Plus className="w-12 h-12 text-black" />
      </Link>

      {/* Transactions Button */}
      <Link href="/mainpage/transactionsPage" className="flex flex-col items-center text-white text-xs">
        <Layers className="w-12 h-12" />
        Transactions
      </Link>
    </div>
  );
}