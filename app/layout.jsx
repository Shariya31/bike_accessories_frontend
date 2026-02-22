'use client'
import { usePathname } from "next/navigation";
import "./globals.css";
import { Assistant } from 'next/font/google'
import { Navbar } from "@/components/application/Navbar/Navbar";

const assistantFont = Assistant({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" || pathname === "/register";
  return (
    <html lang="en">
      <body
        className={`${assistantFont.className} antialiased`}
      >
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
