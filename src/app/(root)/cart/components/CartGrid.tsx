"use client"
import { useToast } from '@/components/ui/use-toast'
import { getDataApi } from '@/utils/apiFunctions'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardItem from './CardItem'
import { useDispatch } from 'react-redux'
import { setProducts } from '@/lib/store/features/allproducts/allProductsSlice'

const CartGrid = () => {

    const { userId } = useAuth();
    const { toast } = useToast();

    const dispatch = useDispatch();

    //fetching the cart data
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cartproducts'],
        queryFn: () => getDataApi(`/api/cart?clerkId=${userId}`, "Cart Data Fetched!", "Something went wrong while fetching cart Data!", 'Error In CartPage', toast)
    })

    //set the state of the redux
    if (data?.data?.allCartProducts)
        dispatch(setProducts(data?.data?.allCartProducts))

    return (
        <div className="grid gap-4">
            {!isLoading ? (
                !isError ? (
                    data?.data?.allCartProducts.length != 0 ?
                        (
                            data?.data?.allCartProducts.map((cartItem: any) =>
                            (
                                <CardItem key={cartItem._id} id={cartItem._id} imgSrc={cartItem.mainProductData.image} alt={cartItem.mainProductData.title} title={cartItem.mainProductData.title} price={cartItem.mainProductData.price} quantity={cartItem.quantity} />
                            ))

                        )

                        : (
                            <h1>You Haven't added any Product In Card!</h1>
                        )
                ) : (
                    <h1>Something went wrong!</h1>
                )
            ) : (<h1>Loading..</h1>)}
        </div>
    )
}

export default CartGrid
