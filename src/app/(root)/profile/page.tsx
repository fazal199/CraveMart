"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CldUploadWidget } from "next-cloudinary"
import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateDataApi } from '@/utils/apiFunctions'

const ProfilePage = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    if (!userId)
        router.push("/sign-in");

    //react query to handle image update
    const { mutate, isPending, isError, error } = useMutation(
        {
            mutationFn: updateDataApi,
            onSuccess: () => {
                toast({ title: "Dp Successfully Updated!" });
                queryClient.invalidateQueries({ queryKey: ['userdata'] })
            },
            onError: () => {
                toast({ title: "Dp couldn't be updated!" });
                console.log("error in ProfilePage");
                console.log(error);
            }
        }
    )


    const handleSuccessfulUpload = async (result: any, options: any) => {
        console.log(result?.info?.public_id, result?.info?.secure_url);
        mutate({
            url: "/api/user/updateimage",
            postData: { clerkId: userId, publicId: result?.info?.public_id, imgUrl: result?.info?.secure_url },
            successMessage: 'Dp Successfully Updated',
            failureMessage: "Dp couldn't be updated!",
            placeName: 'Error in Profile',
            toast
        })
    }


    return (
        <section>
            <div className="rounded-2xl bg-card shadow-lg mx-auto mt-24 max-w-md px-6 py-16 space-y-6 box-shadow-light ">
                <div className="flex flex-col items-center gap-4">
                    {
                        !isPending ? (
                            !isError ? (
                                <Avatar className="w-20 h-20 border-2 border-card-foreground">
                                    <AvatarImage src={sessionStorage.getItem("avatar") || "/placeholder-user.webp"} />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            ) : (
                                <h1>Something Went Wrong!, Try Again!</h1>
                            )
                        ) : (
                            <h1>Loading..</h1>
                        )
                    }

                    <CldUploadWidget onSuccess={handleSuccessfulUpload} onError={() => toast({ title: "Something went wrong while updating your Dp!", description: "plzz check your internet or try later!", variant: "destructive" })} uploadPreset="cravemart">
                        {({ open, isLoading, error }) => {
                            return (
                                <>
                                    {!error && <Button disabled={isLoading} onClick={() => open()} variant="outline" className="w-32 mx-auto disabled:opacity-55 bg-first-500 text-primary-foreground active:bg-first-200">
                                        {!isLoading ? "Change D.P" : "Loading..."}
                                    </Button>}
                                    {error && <p className="text-red-500 text-sm font-semibold text-center">Error while uploading image!</p>}
                                </>
                            );
                        }}
                    </CldUploadWidget>



                    <div className="space-y-1 text-center mt-8">
                        <div className="text-2xl font-bold text-foreground">{sessionStorage.getItem("username")}</div>
                        <div className="text-sm text-muted-foreground">{sessionStorage.getItem("email")}</div>
                    </div>
                </div>
                <div className="grid gap-3">
                    <Link href={"/userorders"}>
                        <Button variant="outline" className="w-full bg-first-500 text-primary-foreground active:bg-first-200">
                            Your Orders
                        </Button>
                    </Link>
                    <Link href="/editprofile">
                        <Button variant="outline" className="w-full bg-first-500 text-primary-foreground active:bg-first-200">
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </section >
    )
}

export default ProfilePage
