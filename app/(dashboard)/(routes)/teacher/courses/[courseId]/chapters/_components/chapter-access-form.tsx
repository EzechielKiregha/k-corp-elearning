"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormDescription,
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
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course } from '@prisma/client'
import Editor from '@/components/editor'
import Preview from '@/components/preview'
import { start } from 'repl'
import { Checkbox } from '@/components/ui/checkbox'

interface ChapterAccesssFormProps {
    initialData : Chapter;
    courseId : string;
    chapterId : string
}

const formSchema = z.object(
    {
        isFree : z.boolean().default(false),
    }
)

const ChapterAccesssForm = ({
    initialData,
    courseId,
    chapterId
} : ChapterAccesssFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            isFree : !!initialData?.isFree
        }
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
            Chapter Access
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Cancel</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit Access
                    </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            <p className={ cn(
                "text-sm mt-2",
                !initialData.description && "text-slate-500 italic"
            ) }>
                {
                    initialData.isFree
                    ? 
                    <>This Chapter is Free</>
                    :
                    <>This chapter is not Free</>
                }
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
                    name="isFree"
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0
                        rounded-md border p-4'>
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl> 
                            <div className="space-y-1 loading-none">
                                <FormDescription>
                                    Check this Box if you want to make this chapter free for preview
                                </FormDescription>
                            </div>
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

export default ChapterAccesssForm