import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import StoreProvider from "@/lib/store/StoreProvider";
import QueryProvider from "@/lib/react-query/QueryProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
       <StoreProvider>
          <QueryProvider>
            <body className={inter.className}>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
              <Toaster/>
            </body>
          </QueryProvider>
       </StoreProvider>
      
      </html>
    </ClerkProvider>
  );
}
