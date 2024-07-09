import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EditProfilePage = () => {
    return (
        <section>
            <div className="w-full max-w-md mx-auto py-12 px-8 box-shadow-light mt-16">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Profile</h1>
                        <p className="mt-2 text-muted-foreground">Update your profile information.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 ">
                          
                            <div className="">
                                <Label htmlFor="username">Username</Label>
                                <div className="mt-1">
                                    <Input id="username" name="username" type="text" defaultValue="jpalmers" required />
                                </div>
                            </div>
                            <div className="">
                                <Label htmlFor="email">Email</Label>
                                <div className="mt-1">
                                    <Input id="email" name="email" type="email" defaultValue="jpalmers@example.com" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button type="submit" className='w-full bg-first-500'>Save</Button>
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
