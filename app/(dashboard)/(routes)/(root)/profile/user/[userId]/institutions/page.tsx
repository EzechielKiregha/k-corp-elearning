"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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

interface InstitutionFormProps {
    initialData: Institution | null
    userId: string
}

const formSchema = z.object({
    name: z.string().min(1, "Institution name is required"),
    address: z.string().nullable().optional(),
    contactEmail: z.string().email("Invalid email").nullable().optional(),
    contactPhone: z.string().nullable().optional(),
    website: z.string().url("Invalid URL").nullable().optional(),
    registrationNumber: z.string().nullable().optional(),
})

type FormValues = z.infer<typeof formSchema>

const InstitutionForm = ({
    initialData,
    userId
}: InstitutionFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [institution, setInstitution] = useState(initialData)

    const router = useRouter()

    const toggleEditing = () => setIsEditing((current) => !current)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            address: initialData?.address ?? "",
            contactEmail: initialData?.contactEmail ?? "",
            contactPhone: initialData?.contactPhone ?? "",
            website: initialData?.website ?? "",
            registrationNumber: initialData?.registrationNumber ?? "",
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: FormValues) => {
        try {
            let response;
            if (institution) {
                response = await axios.patch(`/api/users/${userId}/institution`, values)
                toast.success("Institution Updated Successfully")
            } else {
                response = await axios.post(`/api/institutions`, values)
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
        <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
            <div className="font-medium flex items-center justify-between">
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
            {!isEditing && institution && (
                <div className="mt-4">
                    <div className={cn(
                        "flex items-center bg-slate-200 gap-x-2 border border-slate-200 rounded-md text-slate-700 p-3",
                        institution.isActivated && "bg-sky-100 border-sky-200 text-sky-700"
                    )}>
                        <div>
                            <p className="font-semibold">{institution.name}</p>
                            <p className="text-sm">{institution.address}</p>
                            <p className="text-sm">{institution.contactEmail}</p>
                            <p className="text-sm">{institution.contactPhone}</p>
                            <p className="text-sm">{institution.website}</p>
                            <p className="text-sm">Reg. No: {institution.registrationNumber}</p>
                        </div>
                        <Badge className={cn(
                            "ml-auto",
                            institution.isActivated ? 'bg-sky-700' : 'bg-slate-500'
                        )}>
                            {institution.isActivated ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
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
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.value || null)}
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
                                            disabled={isSubmitting}
                                            placeholder="Contact Email"
                                            type="email"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.value || null)}
                                        />
                                    </FormControl>
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
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.value || null)}
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
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.value || null)}
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
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.value || null)}
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
            )}
        </div>
    )
}

export default InstitutionForm