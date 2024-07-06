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

interface ChapterTitleFormProps {
    initialData : {
        title : string
    }
    courseId : string,
    chapterId : string,
}

const formSchema = z.object(
    {
        title : z.string().min(1),
    }
)

const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId,
} : ChapterTitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter Updated Successfully")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
        <div className="flex font-medium items-center justify-between">
            Chapter title
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Cancel</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit title
                    </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            <p className="text-sm mt-2">
                {initialData.title}
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                disabled={isSubmitting}
                                placeholder="e.g Introduction to Python Essentials"
                                {...field }
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

export default ChapterTitleForm