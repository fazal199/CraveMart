import React from 'react'
import Header from "@/components/shared/Header"
import Footer from '@/components/shared/Footer';
import { UserButton } from '@clerk/nextjs';
const Rootlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main>
        {children}
        <UserButton/>
      </main>
      <Footer />
    </>
  )
}

export default Rootlayout
