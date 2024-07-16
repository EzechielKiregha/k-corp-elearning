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

interface UserFieldProps {
    initialData: string | number | null | undefined;
    userId: string;
    field: string;
    label: string;
    type?: 'text' | 'number' | 'email';
}

const UserField = ({
    initialData,
    userId,
    field,
    label,
    type = 'text'
}: UserFieldProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const formSchema = z.object({
        [field]: type === 'number' 
            ? z.number().min(0, { message: `${label} must be a positive number` })
            : z.string().min(1, { message: `${label} is required` })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            [field]: initialData || (type === 'number' ? 0 : "")
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: any) => {
        try {
            await axios.patch(`/api/users/${userId}`, values)
            toast.success("User Updated Successfully")
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
                    ) : !(field.includes("Limit") || field.includes("role") || field.includes("created") || field.includes("subscriptionPlan")) && (
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
                                    type={type}
                                    disabled={isSubmitting}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    {...field}
                                    value={type === 'number' ? field.value.toString() : field.value}
                                    onChange={e => field.onChange(type === 'number' ? parseInt(e.target.value) : e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button 
                            disabled = {!isValid || isSubmitting || (field.includes("Limit") || field.includes("role") || field.includes("created") ||field.includes("subscriptionPlan"))}
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

export default UserField