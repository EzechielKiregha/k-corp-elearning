"use client";
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useNavigation } from '@/hooks/useNavigation';


const formSchema = z.object({
    title : z.string().min(1, {
        message : "Title is required"
    })
})

const Create = () => {

    const router = useRouter();
    const nav = useNavigation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : ""
        }
    })
    
    const { isSubmitting, isValid } = form.formState;   
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            nav(`/teacher/courses/${response.data.id}`);
            toast.success("Course created successfully")
        } catch {
            toast.error("Something Went Wrong");
        }
    }
    return (
        <div className="max-w-5xl mx-auto flex items-center justify-center h-full p-44">
            <div>
                <h1 className="text-2xl">
                    Name your course
                </h1>
                <p className='text-sm text-slate-500'>
                    What would you like to name your course, don&apos;t you can change this later
                </p>
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8 pt-8"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g 'Python Essentials'"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will teach in this course?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button onClick={() => nav('/')} type='button' variant="ghost">
                                    Cancel
                                </Button>
                            <Button type='submit' disabled={!isValid || isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Create