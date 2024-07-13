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
import TGlink from '@/components/CustomLink'

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
        <div className="mt-6 border flex flex-col justify-start w-full max-w-[1200px] mx-auto p-4 lg:p-8 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 rounded-md">
        <div className="flex md:flex-col sm:flex-col xs:flex-col lg:flex-row lg:justify-between lg:items-start">
            <div className="flex flex-col lg:w-2/3 ">
                <div className="flex font-medium justify-between items-center mb-4 lg:mb-8">
                    <h2 className="text-2xl lg:text-4xl">Your Information</h2>
                    <Button onClick={toggleEditing} variant="ghost" className="flex items-center text-lg lg:text-xl">
                        {isEditing ? "Cancel" : (
                            <>
                                {!userData ? (
                                    <>
                                        <PlusCircle className="h-5 w-5 mr-2"/>
                                        Add Few Info about your
                                    </>
                                ) : (
                                    <>
                                        <Pencil className="h-5 w-5 mr-2"/>
                                        Edit Your Info
                                    </>
                                )}
                            </>
                        )}
                    </Button>
                </div>
    
                {!isEditing && !userData && (
                    <div className="flex items-center justify-center p-4 lg:p-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl text-center mb-6 lg:mb-8 tracking-wide">
                            ADD USER INFO<br/><br />
                            <i>Click the <strong>Add User Info</strong>, As The Owner Please Provide Some Information About Yourself <br /></i>
                            <span className="bg-gradient-to-r from-sky-700 to-sky-900 text-slate-200 p-3 lg:p-4 inline-block mt-4">
                                First Name <br />Last Name <br />Email <br />
                            </span>
                            <br /><br />
                            <i>next you will click create button and you be redirected to portal </i>
                        </h3>
                    </div>
                )}
    
                {!isEditing && userData && (
                    <div className="mt-4 lg:mt-8 p-6 lg:p-8 border border-slate-200 rounded-md dark:text-slate-700 dark:bg-slate-200 bg-slate-800 text-slate-200">
                        <p className="text-2xl lg:text-4xl font-semibold mb-4">{userData.firstName} {userData.lastName}</p>
                        <p className="text-xl lg:text-2xl mb-2"><i>Username: </i>@{userData.username}</p>
                        <p className="text-xl lg:text-2xl mb-2"><i>Email: </i>{userData.email}</p>
                        <p className="text-xl lg:text-2xl mb-2"><i>Role: </i>{userData.role}</p>
                        <p className="text-xl lg:text-2xl mb-2"><i>Plan: </i>{userData.subscriptionPlan}</p>
                        <p className="text-xl lg:text-2xl mb-2"><i>Courses: </i>{userData.createdCourses} / {userData.coursesLimit}</p>
                    </div>
                )}
            </div>
    
            {goToProfile && !isEditing && (
                <div className="lg:w-1/3 mt-6 lg:mt-20 lg:ml-8">
                    <TGlink href="/profile/user">
                        {!userData?.imageUrl ? (
                            <div className="flex items-center justify-center w-full h-64 lg:h-80 bg-slate-200 rounded-full">
                                <ImageIcon className="text-slate-800 w-24 h-24 lg:w-32 lg:h-32" />
                            </div>
                        ) : (
                            <div className="w-full aspect-square relative">
                                <Image
                                    alt="User"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                    src={userData.imageUrl}
                                />
                            </div>
                        )}
                    </TGlink>
                </div>
            )}
        </div>
    
        {isEditing && (
            <div className="w-full max-w-2xl mx-auto mt-8">
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                    >
                        {/* Form fields - increase size for larger screens */}
                        <FormField 
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="text-lg lg:text-xl p-3 lg:p-4"
                                            disabled={isSubmitting}
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                            className="text-lg lg:text-xl p-3 lg:p-4"
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
                                            className="text-lg lg:text-xl p-3 lg:p-4"
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
                                            className="text-lg lg:text-xl p-3 lg:p-4"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button 
                        disabled={!isValid || isSubmitting}
                        className="w-full text-lg lg:text-xl py-3 lg:py-4"
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