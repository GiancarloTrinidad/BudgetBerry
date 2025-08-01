import { ClerkProvider } from '@clerk/nextjs' 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootProviders from '@/components/providers/RootProviders';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BudgetBerry",
  description: "A User-Friendly Minimal Web Application to track your earnings and expenses",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html 
        lang="en" 
        className="dark"
        style={{
          colorScheme: "dark"
        }}
        >
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}            