"use client"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { PaginationEllipsis, PaginationItem, PaginationNext, PaginationContent, PaginationLink, Pagination, PaginationPrevious } from "@/components/ui/pagination"

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
]

const UserOrderspage = () => {
  return (
    <section>
      <Card className="max-w-7xl mx-auto mt-12">
        <CardHeader className="px-6 py-4 border-b">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search Order Date"
                value={"1-06-2023"}
                className="text-center"

              />
            </div>
            <div>
              <Input
                placeholder="Search Total Products"
                value={"1-06-2023"}
                className="text-center"
              />
            </div>
            <div>
              <Input
                placeholder="Search Payment Mode"
                value={"1-06-2023"}
                className="text-center"

              />
            </div>
            <div>
              <Input
                placeholder="Search Order Status"
                value={"1-06-2023"}
                className="text-center"

              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
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
              {orders.map((order) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination className="mt-4  text-black py-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}

export default UserOrderspage
