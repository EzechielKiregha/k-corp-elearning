"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

interface InstitutionFieldProps {
    initialData: string | null | undefined;
    institutionId: string;
    field: string;
    label: string;
}

const InstitutionField = ({
    initialData,
    institutionId,
    field,
    label
}: InstitutionFieldProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()
    const { userId } = useAuth();

    const toggleEdit = () => setIsEditing((current) => !current)

    const formSchema = z.object({
        [field]: z.string().min(1, {
            message: `${label} is required`
        })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            [field]: initialData || ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: any) => {
        try {
            await axios.patch(`/api/users/${userId}/institutions/${institutionId}`, values)
            toast.success("Institution Updated Successfully")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
            <div className="flex font-medium items-center justify-between">
                {label}
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit {label.toLowerCase()}
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData || "Not set"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                    >
                        <FormField 
                        control={form.control}
                        name={field}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button 
                            disabled = {!isValid || isSubmitting}
                            type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default InstitutionField