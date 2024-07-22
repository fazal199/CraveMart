"use client"
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useToast } from '../ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getDataApi } from '@/utils/apiFunctions';

const UserDataEmpty = () => {

    const { userId } = useAuth();
    const router = useRouter();

    if (!userId)
        router.push("/sign-in")

    const { toast } = useToast();

    //react query to fetch userdata
    const { data } = useQuery({
        queryKey: ["userdata"],
        queryFn: () => getDataApi(`/api/user/getuser?clerkId=${userId}`, 'UserData Fetched Successfully!', 'Something went wrong while fetching userdata!', 'Error In UserDataEmpty', toast)
    })

    useEffect(() => {

        sessionStorage.setItem("username", data?.data?.username);
        sessionStorage.setItem("avatar", data?.data?.avatar);
        sessionStorage.setItem("email", data?.data?.email);

    }, [data, userId])

    return (
        <>

        </>
    )
}

export default UserDataEmpty
