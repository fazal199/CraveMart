
"use client";
import React from 'react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import checkoutSchema from '@/lib/zodschemas/checkout.schema'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuth } from '@clerk/nextjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { sendDataApi } from '@/utils/apiFunctions';
import { useToast } from '@/components/ui/use-toast';

const CheckOutPage = () => {

  const { userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: sendDataApi,
    onSuccess: () => {
      toast({
        title: "Your Order Successfully Placed!",
        description: "You are being Redirect to Orders Page."
      })

      setTimeout(() => {
        router.push('/userorders')
      }, 2000);

    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Your Order couldn't be Placed!",
        description: "Plzz check your network or try later."
      })
      setTimeout(() => {
        router.push('/cart')
      }, 1000);

    }
  });

  //taking all the cart products
  let cartItems = useSelector((state: RootState) => state?.cartproducts?.allCartProducts);

  //if there is no products in the cart then move to cart
  if (cartItems.length == 0 || !cartItems)
    router.push("/cart");

  //taking only 2 properties from the cart state
  cartItems = cartItems.map((item: any) => {
    return { productId: item.productId, quantity: item.quantity }
  })


  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema)
  })

  function onSubmit(values: z.infer<typeof checkoutSchema>) {

    //if user selected the cash on delivery mode
    const data = {
      clerkId: userId,
      address: values.address,
      paymentMode: "cod",
      phoneNumber: values.phoneno,
      totalPrice: sessionStorage.getItem("totalPrice"),
      cartItems
    };
    if (values.paymentMethod == "cod") {
      mutate({
        url: "/api/orders",
        postData: data,
        successMessage: "Your Order Successfully Placed!",
        failureMessage: "Your Order couldn't be Placed!",
        placeName: 'Error in checkoutpage', toast
      });

    
    }
  }


  return (
    <section>
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader className="text-center">
          <CardTitle className=" text-4xl font-semibold">Checkout</CardTitle>
          <CardDescription className="!mt-5 text-lg">Enter your details to complete your order.</CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea  {...field} placeholder="Enter your address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your Phone No:" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        {...field}
                        onValueChange={field.onChange}

                        className='mt-2 space-y-1 *:cursor-pointer'>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="online" id='online' />
                          </FormControl>
                          <FormLabel htmlFor='online' className="font-normal">
                            Online Payment
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cod" id='cash' />
                          </FormControl>
                          <FormLabel htmlFor='cash' className="font-normal">
                            Cash On Delivery
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type='submit' className="w-full font-semibold bg-first-500 mt-5 disabled:opacity-55">{!isPending ? 'Place Order' : 'Loading...'}</Button>

            </form>
          </Form>
        </CardContent>

      </Card>
    </section>
  )
}

export default CheckOutPage
