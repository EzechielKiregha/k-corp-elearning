"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import { Institution } from '@prisma/client'

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
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import TGlink from '@/components/CustomLink'


interface InstitutionForNewUserFormProps {
    initialData: Institution | null
    userId: string
}

const formSchema = z.object({
    name: z.string().min(1, "Institution name is required"),
    address: z.string().min(1, "Address is required"),
    contactEmail: z.string().email("Invalid email"),
    contactPhone: z.string().min(1, "Contact phone is required"),
    website: z.string().url("Invalid URL").optional(),
    registrationNumber: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const InstitutionForNewUserForm = ({
    initialData,
    userId
}: InstitutionForNewUserFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [institution, setInstitution] = useState(initialData)
    const [goToProfile, setGoToProfile] = useState(false)
    const { user } = useUser();

    const router = useRouter()

    const toggleEditing = () => {
        if (institution?.id){
            setGoToProfile(true)
        } else (
            setGoToProfile(false)
        )
        return setIsEditing((current) => !current)
    }
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: initialData?.name ?? "",
            address: initialData?.address ?? "",
            contactEmail: user?.primaryEmailAddress?.emailAddress ?? initialData?.contactEmail ?? "",
            contactPhone: initialData?.contactPhone ?? "",
            website: initialData?.website ?? "",
            registrationNumber: initialData?.registrationNumber ?? "",
        }
    })
    const { isSubmitting, isValid } = form.formState

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            form.setValue('contactEmail', user.primaryEmailAddress.emailAddress);
        }
    }, [user, form]);

    useEffect(() => {
        if (initialData) {
        setInstitution(initialData);
        if (initialData.id) setGoToProfile(true);
        form.reset({
            name: initialData.name || "",
            address: initialData.address || "",
            contactEmail: initialData.contactEmail || "",
            contactPhone: initialData.contactPhone || "",
            website: initialData.website || "",
            registrationNumber: initialData.registrationNumber || "",
        });
        }
    }, [initialData, form]);

    const onSubmit = async (values: FormValues) => {
        try {
            const userData = {
                values: {
                    ...values,
                }
            };
            let response;
            if (institution) {
                response = await axios.patch(`/api/users/${userId}/institutions/${institution.id}`, userData)
                toast.success("Institution Updated Successfully")
            } else {
                response = await axios.post(`/api/users/${userId}/institutions`, userData)
                toast.success("Institution Created Successfully")
            }
            setInstitution(response.data)
            toggleEditing()
            router.refresh()
        } catch {   
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className="mt-6 border flex flex-col justify-start w-full max-w-[1200px] mx-auto p-4 lg:p-6 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 rounded-md">
        <div className="flex flex-col">
            <div className="flex font-medium justify-between items-center mb-4 lg:mb-6">
                <h2 className="text-2xl lg:text-3xl">Institution Details</h2>
                <Button onClick={toggleEditing} variant="ghost" className="flex items-center text-lg lg:text-xl">
                    {isEditing ? "Cancel" : (
                        <>
                            {!institution ? (
                                <>
                                    <PlusCircle className="h-5 w-5 mr-2"/>
                                    Add Institution
                                </>
                            ) : (
                                <>
                                    <Pencil className="h-5 w-5 mr-2"/>
                                    Edit Institution
                                </>
                            )}
                        </>
                    )}
                </Button>
            </div>
            
            {goToProfile && !isEditing && (
                <TGlink href={`/profile/user/institutions/${institution?.id}`} className="mb-6 lg:mb-8">
                    {!institution?.imageUrl ? (
                        <div className="flex items-center justify-center w-full h-56 sm:h-64 md:h-80 lg:h-96 bg-slate-600 rounded-md">
                            <ImageIcon className="text-slate-800 w-20 h-20 lg:w-24 lg:h-24" />
                        </div>
                    ) : (
                        <div className="aspect-video w-full">
                            <Image
                                alt="Upload"
                                layout="responsive"
                                width={16}
                                height={9}
                                className="object-cover rounded-md"
                                src={institution.imageUrl}
                            />
                        </div>
                    )}
                </TGlink>
            )}

            {!isEditing && !institution && (
                <div className="flex items-center justify-center p-4 lg:p-8">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl text-center mb-6 lg:mb-8 tracking-wide">
                        ADD INSTITUTION<br/><br />
                        <i>Click the <strong>Add Institution</strong>, Please Provide Some Information About Your <br /></i>
                        <span className="bg-gradient-to-r from-sky-700 to-sky-900 text-slate-200 p-3 lg:p-4 inline-block mt-4">
                            Institution <br />Business <br />University <br />Tech Company <br />
                            College <br />
                        </span>
                        <br /><br />
                        <i>next you will click create button and you be redirected to portal </i>
                    </h3>
                </div>
            )}

            {!isEditing && institution && (
                <div className="mt-6 lg:mt-8">
                    <div className={cn(
                        "flex flex-col justify-between p-6 lg:p-8 bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-700 border border-slate-200 rounded-md",
                        institution.isActivated && "bg-sky-100 border-sky-200 text-sky-800"
                    )}>
                        <div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">{institution.name}</p>
                            <p className="text-xl lg:text-2xl mb-2"><i>Address: </i>{institution.address}</p>
                            <p className="text-xl lg:text-2xl mb-2"><i>Email: </i>{institution.contactEmail}</p>
                            <p className="text-xl lg:text-2xl mb-2"><i>Tel: </i>{institution.contactPhone}</p>
                            <p className="text-xl lg:text-2xl mb-2"><i>Website: </i>
                                <a className='text-blue-700' href={`${institution.website?.includes('https://') ? institution.website : "https://"+institution.website}`} target="_blank" rel="noopener noreferrer">
                                    {institution.website}
                                </a>
                            </p>
                            <p className="text-xl lg:text-2xl mb-2"><i>Reg. No: </i>{institution.registrationNumber}</p>
                        </div>
                        <Badge className={cn(
                            "self-end mt-6 px-6 py-3 text-lg",
                            institution.isActivated ? 'bg-green-700 text-slate-100' : 'bg-gray-900 text-slate-100'
                        )}>
                            {institution.isActivated ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="w-full max-w-2xl mx-auto">
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-6"
                        >
                            {/* Form fields - increase size for larger screens */}
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="text-lg lg:text-xl p-3 lg:p-4"
                                                disabled={isSubmitting}
                                                placeholder="Institution name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Address"
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
                            name="contactEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            // disabled={isSubmitting || !!user?.primaryEmailAddress?.emailAddress}
                                            placeholder="Contact Email"
                                            type="email"
                                            className="text-lg lg:text-xl p-3 lg:p-4"
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
                                name="contactPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Contact Phone"
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
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Website"
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
                                name="registrationNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Registration Number"
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
                                {institution ? "Update" : "Create"}
                            </Button>
                        </form>
                    </Form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InstitutionForNewUserForm