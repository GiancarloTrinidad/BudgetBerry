import React from 'react'
import Logo from "@/components/Logo"

export default function layout({ children }) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <Logo />
        <div className="mt-12">{children}</div>
    </div>
  )
}