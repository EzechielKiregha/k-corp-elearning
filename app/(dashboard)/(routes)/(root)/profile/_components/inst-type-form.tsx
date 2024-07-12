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
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Course, Institution } from '@prisma/client'
import { Combobox } from '@/components/ui/combobox'
import { useAuth } from '@clerk/nextjs'

interface InstitutionTypeFormProps {
    initialData : Institution;
    institutionId : string;
    options : { label : string; value : string; }[];
}

const formSchema = z.object(
    {
        institutionId : z.string().min(1),
    }
)

const InstitutionTypeForm = ({
    initialData,
    institutionId,
    options,
} : InstitutionTypeFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()
    const { userId } = useAuth();

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            institutionId : initialData?.institutionTypeId || ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/users/${userId}/institutions/${institutionId}`, values)
            toast.success("Institution Type Successfully")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

    const selectedOption = options.find((option) => option.value === initialData.institutionTypeId);

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
        <div className="flex font-medium items-center justify-between">
            Institution Type
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Cancel</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit Type
                    </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            <p className={ cn(
                "text-sm mt-2",
                !initialData.institutionTypeId && "text-slate-500 italic"
            ) }>
                {selectedOption?.label || "No Category"}
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
                    name="institutionId"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Combobox
                                    options={options}
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

export default InstitutionTypeForm