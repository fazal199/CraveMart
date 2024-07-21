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

const orders = [
  {
    id: 1,
    orderDate: "2023-06-01",
    totalProducts: 3,
    paymentMode: "Credit Card",
    orderStatus: "Delivered",
  },
  {
    id: 2,
    orderDate: "2023-05-15",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Delivered",
  },
  {
    id: 3,
    orderDate: "2023-04-20",
    totalProducts: 2,
    paymentMode: "Bank Transfer",
    orderStatus: "Pending",
  },
  {
    id: 4,
    orderDate: "2023-03-10",
    totalProducts: 4,
    paymentMode: "Credit Card",
    orderStatus: "Delivered",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
  {
    id: 5,
    orderDate: "2023-02-28",
    totalProducts: 1,
    paymentMode: "PayPal",
    orderStatus: "Pending",
  },
]

const UserOrderspage = () => {

  const { userId } = useAuth();
  const { toast } = useToast();
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ['userorders'],
  //   queryFn: () => getDataApi(`/api/orders?clerkId=${userId}&page=1`, "User Orders Fetched!", "Opps! Something went wrong!", 'Error in userorderspage', toast)
  // })

  // console.log(data);


  return (
    <section>
      <Card className="max-w-7xl mx-auto mt-12">
        <CardContent className="p-6">
          {/* <Table>
            <TableHeader className="text-xl">
              <TableRow>
                <TableHead className="cursor-pointer text-center">
                  Order Date

                </TableHead>
                <TableHead className="cursor-pointer text-center" >
                  Total Products

                </TableHead>
                <TableHead className="cursor-pointer text-center" >
                  Payment Mode

                </TableHead>
                <TableHead className="cursor-pointer text-center" >
                  Order Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-lg">


              {
                !isLoading ? (
                  !isError ? (

                    orders.length != 0 ? (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="text-center py-5">{order.orderDate}</TableCell>
                          <TableCell className="text-center py-5">{order.totalProducts}</TableCell>
                          <TableCell className="text-center py-5">{order.paymentMode}</TableCell>
                          <TableCell>
                            <Badge className={`text-xs text-center block py-5 mx-auto w-5/12 ${order.orderStatus == "Delivered" ? 'bg-green-500' : 'bg-red-500'}`}>
                              {order.orderStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell><h1>You Haven't Ordered anything yet!</h1></TableCell></TableRow>

                    )

                  ) : (
                    <TableRow><TableCell><h1>Something went wrong, plzz try later!</h1></TableCell></TableRow>
                  )
                ) : (
                  <TableRow><TableCell><h1>Loading..!</h1></TableCell></TableRow>
                )
              }

              
            </TableBody>
          </Table> */}
            <DataTable data={orders} columns={UserOrdercolumns} />
        </CardContent>
      </Card>
     
    </section>
  )
}

export default UserOrderspage
