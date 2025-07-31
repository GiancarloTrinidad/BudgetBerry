"use client"

import { CircleUser, Home, Layers, Plus } from 'lucide-react'; 
import Link from 'next/link';
import Logo, { LogoMobile } from './Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from './ModeToggle';
import { useState } from 'react';

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

const items = [
  { label: "Home", link: "/home"},
  { label: "Transactions", link: "/transactions"}
];

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full"></div>
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
    </div>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
    </div>

    <div style={{ backgroundColor: '#232532' }} className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-[#1e1e1e] flex justify-between items-center px-9 py-1 max-w-200 mx-auto rounded-full md:hidden">
      
      {/* Home Button */}
      <Link href="/mainpage/homePage" className="flex flex-col items-center text-white text-xs">
        <Home className="w-8 h-8" />
        Home
      </Link>

      {/* Center (absolute, pinned to middle) */}
      <Link
        href="/mainpage/addTransactions"
        aria-label="Add transaction"
        style={{ backgroundColor: '#C0C5D9' }}
        className="absolute left-1/2 -translate-x-1/2 -top-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md border-0 z-10"
      >
        <Plus className="w-8 h-8 text-black" />
      </Link>

      {/* Transactions Button */}
      <Link href="/mainpage/transactionsPage" className="flex flex-col items-center text-white text-xs">
        <Layers className="w-8 h-8" />
        Transactions
      </Link>

      {/* Transactions Button
      <Link href="/" className="flex flex-col items-center text-white text-xs">
        <CircleUser className="w-8 h-8" />
        Log Out
      </Link> */}
    </div>
    </>
  );
}

function NavbarItem({ link, label }) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link 
        href={link} 
        className={cn(
          buttonVariants({variant: "ghost"}),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {label}
      </Link>
      {
        isActive && (
          <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
        )
      }
    </div>
  );
}