import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Assistant } from 'next/font/google'
import GlobalProvider from "@/components/application/GlobalProvider/GlobalProvider";

const assistantFont = Assistant({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${assistantFont.className} antialiased`}
      >
        <GlobalProvider>

        <ToastContainer/>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
