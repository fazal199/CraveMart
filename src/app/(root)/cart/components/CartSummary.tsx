"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RootState } from '@/lib/store/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'


const CartSummary = () => {

    const allCartProducts = useSelector((state: RootState) => state.cartproducts.allCartProducts);
    const router = useRouter();
    const subTotal = allCartProducts.reduce((prev: any, next: any) => {
        return prev + (next.quantity * next.mainProductData.price);
    }, 0);


    useEffect(() => {
        sessionStorage.setItem('totalPrice', subTotal);
    }, [subTotal])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Separator />
                <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>₹{allCartProducts.length == 0 ? 0 : subTotal}</span>
                </div>
            </CardContent>
            <CardFooter>
                {<Button onClick={() => router.push("/checkout")} disabled={allCartProducts.length == 0} className="w-full bg-first-500 disabled:opacity-35 hover:bg-white hover:text-first-500 hover:border-first-500 border-2 border-solid">Proceed to Checkout</Button>}
            </CardFooter>
        </Card>
    )
}

export default CartSummary
