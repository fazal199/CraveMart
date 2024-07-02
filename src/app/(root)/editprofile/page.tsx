import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadIcon } from 'lucide-react'
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
                                <Label htmlFor="profile-picture">Profile Picture</Label>
                                <div className="mt-1 flex items-center">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>JP</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" className="ml-5">
                                        <UploadIcon />
                                        Upload
                                    </Button>
                                    <input id="profile-picture" name="profile-picture" type="file" className="sr-only" />
                                </div>
                            </div>
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
                </div>
            </div>
        </section>
    )
}

export default EditProfilePage
