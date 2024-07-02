import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const ProfilePage = () => {
    return (
        <section>
            <div className="rounded-2xl bg-card shadow-lg mx-auto mt-24 max-w-md px-6 py-16 space-y-6 box-shadow-light ">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20 border-2 border-card-foreground">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center">
                        <div className="text-2xl font-bold text-foreground">John Doe</div>
                        <div className="text-sm text-muted-foreground">john@example.com</div>
                    </div>
                </div>
                <div className="grid gap-3">
                    <Button variant="outline" className="w-full bg-first-500 text-primary-foreground active:bg-first-200">
                        Your Orders
                    </Button>
                   <Link href="/editprofile">
                        <Button variant="outline" className="w-full bg-first-500 text-primary-foreground active:bg-first-200">
                            Edit Profile
                        </Button>
                   </Link>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage
