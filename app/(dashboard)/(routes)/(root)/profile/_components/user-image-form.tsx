"use client"

import * as z from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import FileUpload from '@/components/file-upload'
import Image from 'next/image'

interface UserImageFormProps {
    initialData : User
    userId : string
}

const formSchema = z.object(
    {
        imageUrl : z.string().min(1, {
            message : "imageUrl is required"
        })
    }
)

const UserImageForm = ({
    initialData,
    userId
} : UserImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
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
        <div className="border w-96  bg-slate-100 dark:bg-slate-900 dark:text-slate-200 p-2 rounded-md">
            <div className="flex font-medium items-center justify-between">
                User image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && !initialData.imageUrl ? (
                        <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add image
                        </>
                    ): !isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit image
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-72 rounded-md bg-slate-200">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt = "Upload"
                            layout="responsive"
                                width={16}
                                height={9}
                            className="object-cover rounded-full"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({imageUrl : url})
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserImageForm