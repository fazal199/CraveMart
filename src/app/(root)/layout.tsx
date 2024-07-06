import React from 'react'
import Header from "@/components/shared/Header"
import Footer from '@/components/shared/Footer';
import { SignedIn, SignOutButton } from '@clerk/nextjs';

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
        <SignedIn> <SignOutButton>SignOut</SignOutButton></SignedIn>

      </main>
      <Footer />
    </>
  )
}

export default Rootlayout
