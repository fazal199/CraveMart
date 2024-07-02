import React from 'react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

const CheckOutPage = () => {
  return (
    <section>
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader className="text-center">
          <CardTitle className=" text-4xl font-semibold">Checkout</CardTitle>
          <CardDescription className="!mt-5 text-lg">Enter your details to complete your order.</CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <form className="grid gap-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter your address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="total-price">Total Price</Label>
                <Input id="total-price" type="number" placeholder="Enter the total price" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Payment Method</Label>
              <RadioGroup defaultValue="online">
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="online" value="online" />
                  <Label htmlFor="online">Online Payment</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="cash" value="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full font-semibold bg-first-500">Place Order</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default CheckOutPage
