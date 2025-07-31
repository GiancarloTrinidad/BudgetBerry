import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/home" className="flex items-center gap-2">
        <Image
            src="/images/logo.png"
            alt="BudgetBerry Logo"
            width={250}
            height={150}
            priority
        />
    </Link>
  )
}

export function LogoMobile() {
  return (
    <Link href="/home" className="flex items-center gap-2">
        <Image
            src="/images/logo.png"
            alt="BudgetBerry Logo"
            width={175}
            height={100}
            priority
        />
    </Link>
  )
}

export default Logo