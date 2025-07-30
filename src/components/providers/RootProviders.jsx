"use client"

import { ThemeProvider } from 'next-themes'
import React from 'react'

function RootProviders({ children }) {
  return (
    <ThemeProvider 
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
  )
}

export default RootProviders