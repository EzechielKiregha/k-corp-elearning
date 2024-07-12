"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { User } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

interface NewUserFormProps {
    initialData: User | null;
    selectedPlan : string;
}

const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
})

type FormValues = z.infer<typeof formSchema>

const NewUserForm = ({
    initialData,
    selectedPlan
}: NewUserFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [goToProfile, setGoToProfile] = useState(false)
    const [userData, setUserData] = useState(initialData)
    const { user } = useUser();

    const router = useRouter()

    const toggleEditing = () => setIsEditing((current) => !current)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: initialData?.username ?? "",
            email: user?.primaryEmailAddress?.emailAddress ?? initialData?.email ?? "",
            firstName: initialData?.firstName ?? "",
            lastName: initialData?.lastName ?? "",
        }
    })

    const { isSubmitting, isValid } = form.formState

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            form.setValue('email', user.primaryEmailAddress.emailAddress);
        }
    }, [user, form]);

    useEffect(() => {
        if (initialData) {
            setUserData(initialData);
            if (initialData.id) setGoToProfile(true);
        form.reset({
            username: initialData.username || "",
            email: initialData.email || "",
            firstName: initialData.firstName || "",
            lastName: initialData.lastName || "",
        });
        }
    }, [initialData, form]);

    const onSubmit = async (values: FormValues) => {
        try {
            const userD = {
                selectedPlan,
                values: {
                    ...values,
                }
            };
            let response;
            if (userData) {
                response = await axios.patch(`/api/users/${userData.id}`, userD )
                toast.success("User Updated Successfully")
            } else {
                response = await axios.post(`/api/users`, userD )
                toast.success("User Created Successfully")
            }
            setUserData(response.data)
            toggleEditing()
            router.refresh()
        } catch {   
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className="mt-6 flex flex-col justify-start border lg:w-[900px] lg:h-[500px] 
            md:w-[600px] md:h-[400px] w-[370px] h-[320px] sm:w-[600px] sm:h-[400px] 
        bg-slate-100 dark:bg-slate-800 dark:text-slate-200 xs:p-2 sm:p-2 lg:p-4 rounded-md">
            <div className="flex flex-col ">
                <div className="flex font-medium relative mt-0 justify-between">
                User Details
                {goToProfile && !isEditing && (
                    <Link href="/profile/user">
                        {!userData?.imageUrl ? (
                            <div className="flex absolute items-center justify-center w-20 h-20 mt-8 -ml-6 md:-ml-16 lg:h-60 lg:-ml-20 lg:w-60 sm:-ml-8 xs:-ml-6 sm:h-32 sm:w-32 xs:h-20 xs:w-20  rounded-full bg-slate-200">
                                <ImageIcon className=" text-slate-800" />
                            </div>
                        ) : (
                            <div className=" aspect-video mt-2">
                                <Image
                                    alt = "Upload"
                                    fill
                                    className="object-cover rounded-md"
                                    src={userData?.imageUrl}
                                />
                            </div>
                        )}
                    </Link>
                )}
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && "Cancel"}
                    {!isEditing && !userData && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add User Info
                        </>
                    )}

                    {!isEditing && userData && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit User Info
                        </>
                    )}
                </Button>
                </div>
                {!isEditing && !userData && (
                    <div className=" flex items-center justify-center p-4">
                    <h3 className="sm:text-xl lg:text-2xl text-center mb-6 tracking-wide">ADD USER INFO<br/><br />
                            
                                <i>Click the <strong>Add User Info</strong>,As The Owner Please Provide Some Information About Yourself <br /></i>
                            <span className="bg-gradient-to-r from-sky-700 to-sky-900 text-slate-200 ">
                                First Name <br />Last Name <br />Email <br /> <br /><br /><br />
                            </span>
                            <i>next you will click create button and you be redirected to portal </i>
                        </h3>

                    </div>
                )}
            </div>
            {!isEditing && userData && (
                <div className=" mt-14 lg:mt-12">
                    <div className="flex justify-center text-4xl md:text-2xl items-end 
                    lg:w-[865px] lg:h-[380px] md:w-[580px]  md:h-[300px]  sm:w-[580px] sm:h-[300px] xs:h-[200px] xs:w-[460px]  gap-x-2 border 
                    border-slate-200 rounded-md dark:text-slate-700 dark:bg-slate-200 bg-slate-800 text-slate-200 p-3">
                        <div>
                            <p className="font-semibold">{userData.firstName} {userData.lastName}</p>
                            <p className="text-xl"><i>Username:    </i>@{userData.username}</p>
                            <p className="text-xl"><i>Email:    </i>{userData.email}</p>
                            <p className="text-xl"><i>Role:     </i>{userData.role}</p>
                            <p className="text-xl"><i>Plan:     </i>{userData.subscriptionPlan}</p>
                            <p className="text-xl"><i>Courses:  </i>{userData.createdCourses} / {userData.coursesLimit}</p>
                        </div>
                    </div>
                </div>
            )}
            {isEditing && (
                <div className="flex justify-center items-start">
                    <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-10 w-[70%] "
                    >
                        <FormField 
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting || !!user?.primaryEmailAddress?.emailAddress}
                                            placeholder="Email"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    {!user?.primaryEmailAddress?.emailAddress && (
                                        <p className="text-sm text-red-500">No email associated with your account. Please enter manually.</p>
                                    )}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Last Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button 
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        >
                            {userData ? "Update" : "Create"}
                        </Button>
                    </form>
                </Form>
                </div>
            )}
        </div>
    )
}

export default NewUserForm