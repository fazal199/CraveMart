"use client";

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast';
import { deleteDataApi, updateDataApi } from '@/utils/apiFunctions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'

const CardItem = ({ id, imgSrc, alt, title, price, quantity }: any) => {

    //state to manage the current quantity
    const [currentQuantityClient, setCurrentQuantityClient] = useState(quantity);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    //using react query to update quantity of cartItem
    const { mutate } = useMutation({
        mutationFn: updateDataApi,
        onSuccess: () => {
            toast({
                title: 'Quantity Updated!',
            });
            queryClient.invalidateQueries({ queryKey: ['cartproducts'] })
        },
        onError: () => {
            toast({
                title: 'Quantity could not be updated!',
            });
        }
    });

    //using react query to delete the cart item
    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteDataApi,
        onSuccess: () => {
            toast({
                title: 'CartItem Deleted!',
            });
            queryClient.invalidateQueries({ queryKey: ['cartproducts'] })

        },
        onError: () => {
            toast({
                title: 'CartItem could not be deleted!',
            });
        }
    });

    //to update quantity of cartItem
    const handleUpdateQuantity = () => {

        mutate({
            url: "/api/cart",
            postData: {
                cartItemId: id,
                quantity: currentQuantityClient
            },
            successMessage: "Quantity Updated!",
            failureMessage: "Quantity couldn't be updated!",
            placeName: "Error in CardItem component",
            toast
        });
    };

    //debouncing function to make only one api call, doesn't matter how many times the button is clicked by user!
    const debounceHandleUpdateQuantity = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(handleUpdateQuantity, 500);
    };

    //to manage api calls
    useEffect(() => {

        if (currentQuantityClient != quantity)
            debounceHandleUpdateQuantity();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentQuantityClient, debounceHandleUpdateQuantity, quantity]);


    return (
        <Card className="flex items-center gap-4 relative px-8 py-4">
            <Image src={imgSrc} alt={alt} width={80} height={80} className="rounded-md" />
            <div className="flex-1">
                <h3 className="font-medium">{title}</h3>
                <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">₹{price}</div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCurrentQuantityClient(currentQuantityClient + 1)}
                            size="icon"
                            variant="outline"
                            disabled={false}
                        >
                            <PlusIcon />
                        </Button>
                        <div>{currentQuantityClient}</div>
                        <Button
                            onClick={() => {
                                if (currentQuantityClient > 1) {
                                    setCurrentQuantityClient(currentQuantityClient - 1);
                                }
                            }}
                            size="icon"
                            variant="outline"
                        >
                            <MinusIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <Button size="icon" className='absolute top-0 right-0 bg-red-600 text-white' variant="outline">
                <TrashIcon onClick={() => deleteMutate({
                    url: `/api/cart?cartItemId=${id}`,
                    failureMessage: "CartItem could not be deleted!",
                    successMessage: "CartItem Deleted!",
                    placeName: "Error in CardItem",
                    toast
                })} />
            </Button>
        </Card>
    );
};

export default CardItem;
