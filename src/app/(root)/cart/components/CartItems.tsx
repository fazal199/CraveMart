import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CartItems = () => {
    return (
        <div className="grid gap-4">
            <Card className="flex items-center gap-4 relative px-8">
                <Image src="/placeholder.svg" alt={"hello"} width={80} height={80} className="rounded-md" />
                <div className="flex-1">
                    <h3 className="font-medium">wow</h3>
                    <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">789</div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="icon"
                                variant="outline"

                                disabled={false}
                            >
                                <PlusIcon />
                            </Button>
                            <div>Qty</div>
                            <Button
                                size="icon"
                                variant="outline"

                            >
                                <MinusIcon />
                            </Button>
                        </div>
                    </div>
                </div>
                <Button size="icon" className='absolute top-0 right-0 bg-red-600 text-white' variant="outline" >
                    <TrashIcon />
                </Button>
            </Card>

        </div>
    )
}

export default CartItems
