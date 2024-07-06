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
import { Loader2, Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course } from '@prisma/client'
import { ChaptersList } from './chapters-list'

interface ChaptersFormProps {
    initialData : Course & { chapters : Chapter[] }
    courseId : string
}

const formSchema = z.object(
    {
        title : z.string().min(1),
    }
)

const ChaptersForm = ({
    initialData,
    courseId
} : ChaptersFormProps) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false)


    const router = useRouter()

    const toggleCreating = () => setIsCreating((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            toast.success("Chapter Created Successfully")
            toggleCreating()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

    const onReorder = async (updateData : {id : string, position : number}[]) => {
        try {
            setIsUpdating(true);

            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list : updateData,
            });
            toast.success("Chapters reordered")
        } catch (error) {
            toast.error("Something Went Wrong")
        } finally {
            setIsUpdating(false)
        }
    }

    const onEdit = async (id : string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    }

  return (
    <div className="relative mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
        {isUpdating && (
            <div className="absolute h-full w-full bg-slate-500/20 dark:bg-slate-800 dark:text-slate-200 top-0 right-0 rounded-m flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
            </div>
        )}
        <div className="flex font-medium items-center justify-between">
            Course chapters
            <Button onClick={toggleCreating} variant="ghost">
                {isCreating ? (
                    <>Cancel</>
                ) : (
                    <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add a chapter
                    </>
                )}
                
            </Button>
        </div>
        {isCreating && (
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
                                    placeholder="e.g 'introduction'"
                                    {...field }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                        <Button 
                        disabled = {!isValid || isSubmitting}
                        type="submit"
                        >
                            Create
                        </Button>
                </form>
            </Form>
        )}
        {!isCreating && (
            <div className={ cn(
                "text-sm mt-2",
                !initialData.chapters.length && "text-slate-500 italic"
            ) }>
                {!initialData.chapters.length && "no chapter"}
                <ChaptersList
                onEdit={onEdit}
                onReorder={onReorder}
                items={initialData.chapters || []}
                />
            </div>
        )}
        {!isCreating && (
            <p className="text-xs text-muted-foreground  dark:text-slate-400 mt-4">
                Drag and Drop to reorder the chapters
            </p>
        )}
    </div>
  )
}

export default ChaptersForm