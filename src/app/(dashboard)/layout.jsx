import BottomBar from '@/components/Navbar'
import React from 'react'

function layout({ children }) {
  return (
    <div className="relative flex h-screen w-full flex-col">
        <BottomBar />
        <div className="w-full">{children}</div>
    </div>
  )
}

export default layout