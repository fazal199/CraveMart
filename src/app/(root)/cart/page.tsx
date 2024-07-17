import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'
import CartGrid from './components/CartGrid'
import CartSummary from './components/CartSummary'


const CartPage = () => {

    return (
        <section className="grid grid-cart gap-8 px-6 py-12">
            <div className="grid gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Your Cart</h1>
                    <Link href="/" className="text-first-500 decoration-2 underline hover:tracking-wider transition-all duration-500 ease-out" prefetch={false}>
                        Continue Shopping
                    </Link>
                </div>
                <CartGrid/>
            </div>
           <CartSummary/>
        </section>
    )
}

export default CartPage
