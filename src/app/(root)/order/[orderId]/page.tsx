import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const OrderDetailsPage = () => {
    return (
        <section>
            <h1 className="text-center text-6xl font-semibold mb-12 mt-20">Your Order Of 12-04-2024</h1>

            <div className="grid gap-4 max-w-7xl mx-auto mt-16">
                <Link href={`/product/2`}>
                    <Card className="flex items-center gap-4 relative px-8 py-2">
                        <Image src="/placeholder.svg" alt={"hello"} width={80} height={80} className="rounded-md" />
                        <div className="flex-1">
                            <h3 className="font-medium">wow</h3>
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground">789</div>
                                <div className="flex items-center gap-2">
                                    <div><span className='font-semibold'>Quantity: </span>10</div>
                                </div>
                            </div>
                        </div>

                    </Card>
                </Link>

            </div>
        </section>
    )
}

export default OrderDetailsPage
