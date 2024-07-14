import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'
import CartItemCard from './components/CartItemCard'

const CartPage = () => {

    return (
        <section className="grid grid-cart gap-8 px-6 py-12">
            <div className="grid gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Your Cart</h1>
                    <Link href="#" className="text-first-500 hover:underline" prefetch={false}>
                        Continue Shopping
                    </Link>
                </div>
                <CartItemCard />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <span>7985</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>GST (10%)</span>
                        <span>4687</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                        <span>Total</span>
                        <span>487</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-first-500 hover:bg-white hover:text-first-500 hover:border-first-500 border-2 border-solid">Proceed to Checkout</Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default CartPage
