import React from 'react'
import Image from 'next/image'

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
        <Image
            src="/images/logo.png"
            alt="BudgetBerry Logo"
            width={250}
            height={150}
            priority
        />
    </a>
  )
}

export default Logo