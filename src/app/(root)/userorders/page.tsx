"use client"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { PaginationEllipsis, PaginationItem, PaginationNext, PaginationContent, PaginationLink, Pagination, PaginationPrevious } from "@/components/ui/pagination"
import { useQuery } from "@tanstack/react-query"
import { getDataApi } from "@/utils/apiFunctions"
import { useAuth } from "@clerk/nextjs"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "./DataTable"
import { UserOrdercolumns } from "./columns"



const UserOrderspage = () => {

  const { userId } = useAuth();
  const { toast } = useToast();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['userorders'],
    queryFn: () => getDataApi(`/api/orders?clerkId=${userId}&page=1`, "User Orders Fetched!", "Opps! Something went wrong!", 'Error in userorderspage', toast)
  })



  return (
    <section>
      <Card className="max-w-7xl mx-auto mt-12">
        <CardContent className="p-6">

          {
            !isLoading ? (
              !isError ? (
                <DataTable data={data?.data} columns={UserOrdercolumns} />

              ) : (
                <h1>Something went wrong!</h1>
              )
            ) : (
              <h1>Loading Ho rhi hai!</h1>
            )
          }
        </CardContent>
      </Card>

    </section>
  )
}

export default UserOrderspage
