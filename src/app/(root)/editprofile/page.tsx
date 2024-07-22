"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import editProfileSchema from '@/lib/zodschemas/edit.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useDebounceCallback } from 'usehooks-ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDataApi, updateDataApi } from '@/utils/apiFunctions'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


const EditProfilePage = () => {

    const username = sessionStorage.getItem("username");
    const { toast } = useToast();
    const [clientUserName, setClientUserName] = useState<string>('');
    const { userId } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();

    //react query to change user data
    const { mutate, isPending, error } = useMutation({
        mutationFn: updateDataApi,
        onSuccess: () => {
            toast({ title: "Data Updated Successfully!" })
            queryClient.invalidateQueries({ queryKey: ['userdata'] })
            router.push("/profile");
        },
        onError: () => {
            toast({ title: "Something Went wrong while updating Data!" })
            console.log(error);
        }
    });

    //react-hook-form to handle form validation
    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            username: username as string,

        }
    })

    //react query to handle user name
    const { isLoading, isError, data, refetch } = useQuery({
        queryKey: ['usernamecheck', clientUserName],
        queryFn: () => getDataApi(`/api/user/checkusername?username=${clientUserName}`, 'UserName Available', 'Something went wrong while checking username!', 'Error in EditProfile', toast),
        enabled: false //// Disable automatic fetching
    })

    //making api call whenever user type his/her name
    useEffect(() => {
        if (clientUserName) {
            refetch();
        }
    }, [clientUserName, refetch]);


    //debouce the username
    const debounceCheckUsername = useDebounceCallback((newUsername) => {
        setClientUserName(newUsername)
    }, 1000);

    function onSubmit(values: z.infer<typeof editProfileSchema>) {
        mutate({
            url: '/api/user/editprofile',
            postData: {
                clerkId: userId,
                username: values.username,
            },
            successMessage: "Data Updated",
            failureMessage: "Data couldn't be updated!",
            placeName: "Error in EditProfile/submit function",
            toast
        })
    }



    return (
        <section>
            <div className="w-full max-w-md mx-auto py-12 px-8 box-shadow-light mt-16">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Profile</h1>
                        <p className="mt-2 text-muted-foreground">Update your profile information.</p>
                    </div>

                    <div className="space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-y-6 gap-x-4 ">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor='username'>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your username"
                                                    max={10}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        debounceCheckUsername(e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {
                                                !isLoading ? (
                                                    !isError ? (
                                                        <div className={`${data?.success ? 'text-green-500' : 'text-red-500'} text-xs relative `}>{data?.message}</div>
                                                    ) : (
                                                        <div className='text-xs'>something went wrong!</div>
                                                    )
                                                ) : (
                                                    <div className='text-xs'>Loading..</div>
                                                )
                                            }
                                        </FormItem>
                                    )}
                                />



                                <div>
                                    <Button type="submit" disabled={isPending} className='w-full bg-first-500 disabled:opacity-50'>{isPending ? 'Loading...' : 'Save'}</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div>
                        <Link href={"/profile"}><Button className='w-full bg-first-500'>Cancle</Button></Link>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default EditProfilePage
