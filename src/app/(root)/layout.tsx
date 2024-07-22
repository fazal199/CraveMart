import React from 'react'
import Header from "@/components/shared/Header"
import Footer from '@/components/shared/Footer';
import UserDataEmpty from '@/components/shared/UserDataEmpty';

const Rootlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main>
        <UserDataEmpty/>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Rootlayout
