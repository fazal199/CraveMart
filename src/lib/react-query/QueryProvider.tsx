// app/providers.jsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export default function QueryProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}
      {/* <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV == "development"} /> */}
    </QueryClientProvider>
  )
}

// const { data } = useQuery({
//   queryKey: ['todos'], queryFn: async () => {
//     return await axios.get("https://dummyjson.com/products");
//   }
// });
