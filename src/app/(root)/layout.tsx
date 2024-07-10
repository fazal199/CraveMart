import React from 'react'
import Header from "@/components/shared/Header"
import Footer from '@/components/shared/Footer';

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


      </main>
      <Footer />
    </>
  )
}

export default Rootlayout
