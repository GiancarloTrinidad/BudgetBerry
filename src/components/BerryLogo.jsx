import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BerryLogo() {
  return (
    <Image
        src="/images/berry.png"
        alt="BudgetBerry Logo"
        width={70}
        height={70}
        priority
    />
  )
}

export default BerryLogo