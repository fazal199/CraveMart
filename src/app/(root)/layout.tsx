import React from 'react'
import Header from "@/components/component/Header"
const Rootlayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
   <>
      <Header/>
      <main>
        {children}
      </main>
      <footer></footer>
   </>
  )
}

export default Rootlayout
