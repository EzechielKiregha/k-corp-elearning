"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
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
import { Pencil, PlusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'


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
    const { user } = useUser();

    const router = useRouter()

    const toggleEditing = () => setIsEditing((current) => !current)

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
        <div className="mt-6 border flex flex-col justify-start xs:w-[300px] xs:h-[150px] lg:w-[900px] lg:h-[500px] xs:items-center md:w-[600px] md:h-[500px] 
        bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-8 rounded-md">
            <div className="flex flex-col ">
                <div className="flex font-medium items-center justify-between">
                Institution Details
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && "Cancel"}
                    {!isEditing && !institution && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add Institution
                        </>
                    )}
                    {!isEditing && institution && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit Institution
                        </>
                    )}
                </Button>
                </div>
                {!isEditing && !institution && (
                    <div className=" flex items-center justify-center p-4">
                    <h3 className="sm:text-xl lg:text-2xl text-center mb-6 tracking-wide">ADD INSTITUTION<br/><br />
                            
                                <i>Click the <strong>Add Institution</strong>, Please Provide Some Information About Your <br /></i>
                            <span className="bg-gradient-to-r from-sky-700 to-sky-900 text-slate-200 ">
                                Institution <br />Business <br />Universtity <br />Tech Company <br />
                                College <br /><br />
                            </span>
                            <i>next you will click create button and you be redirected to portal </i>
                        </h3>
                        
                    </div>
                )}
            </div>
            {!isEditing && institution && (
                <div className="mt-4">
                    <div className={cn(
                        "flex items-center text-4xl md:text-2xl lg:w-[820px] md:w-[540px] lg:h-[380px] md:h-[350px] xs:w-[300px] xs:h-[150px] bg-slate-200 gap-x-2 border border-slate-200 rounded-md text-slate-700 p-3",
                        institution.isActivated && "bg-sky-100 border-sky-200 text-sky-800"
                    )}>
                        <div>
                            <p className="font-semibold"><i></i>{institution.name}</p><br/>
                            <p className="text-3xl"><i>Address : </i>{institution.address}</p>
                            <p className="text-3xl"><i>email : </i>{institution.contactEmail}</p>
                            <p className="text-3xl"><i>Tel : </i>{institution.contactPhone}</p>
                            <p className="text-3xl"><i>Website : </i>{institution.website}</p>
                            <p className="text-3xl"><i>Reg. No: </i>{institution.registrationNumber}</p>
                        </div>
                        <Badge className={cn(
                            "h-16 absolute ml-[55%]  w-16 ",
                            institution.isActivated ? 'bg-green-700 text-slate-100 font-semibold' : 'bg-gray-900 text-slate-100 font-semibold'
                        )}>
                            {institution.isActivated ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            )}
            {isEditing && (
                <div className="flex justify-center items-start">
                    <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4 w-[70%]"
                    >
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Institution name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
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
                            {institution ? "Update" : "Create"}
                        </Button>
                    </form>
                </Form>
                </div>
            )}
        </div>
    )
}

export default InstitutionForNewUserForm