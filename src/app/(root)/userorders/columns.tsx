"use client"

import { Badge } from "@/components/ui/badge"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"


const HeaderTag = ({ column, title }: { column: any, title: any }) => {
    //if true then ascending, otherwise descending :)
    const order = column.getIsSorted() === "asc"

    return (<div onClick={() => column.toggleSorting(order)} className="text-xl font-semibold flex gap-2 justify-center items-center cursor-pointer">

        <span>{title}</span>
        <span>{column.getCanSort() && column.getIsSorted() === "desc" ? (
            <ArrowUpIcon className="size-6" aria-hidden="true" />

        ) : column.getIsSorted() === "asc" ? (
            <ArrowDownIcon className="size-6" aria-hidden="true" />
        ) : (
            <CaretSortIcon className="size-6" aria-hidden="true" />
        )}</span>

    </div>)

}


export const UserOrdercolumns: any = [
    {
        accessorKey: "orderDate",
        //this is header styling 
        header: ({ column }: { column: any }) => <HeaderTag column={column} title={"OrderDate"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-center text-lg font-medium">{row.getValue("orderDate").split("T")[0]}</div>
        },
    },
    {
        accessorKey: "totalProducts",
        //this is header styling 
        header: ({ column }: { column: any }) => <HeaderTag column={column} title={"Total Products"} />,

        //this is cell
        cell: ({ row }: { row: any }) => {

            return <div className="text-center text-lg font-medium">{row.getValue("totalProducts")}</div>
        },
    },
    {
        accessorKey: "paymentMode",
        header: ({ column }: { column: any }) => <HeaderTag column={column} title={"Payment Mode"} />,

        //this is cell
        cell: ({ row }: { row: any }) => {

            return <div className="text-center text-lg font-medium">{row.getValue("paymentMode")}</div>
        },
    },
    {
        accessorKey: "deliveryStatus",
        //this is header styling 
        header: ({ column }: { column: any }) => <HeaderTag column={column} title={"Delivery Status"} />,

        //this is cell styling
        cell: ({ row }: { row: any }) => {

            const value = row.getValue("deliveryStatus");

            return (
                <Badge className={`text-xs text-center block py-5 w-5/12 mx-auto ${value == "Delivered" ? 'bg-green-500' : 'bg-red-500'}`}>
                    {value}
                </Badge>
            )
        },
    },

]
