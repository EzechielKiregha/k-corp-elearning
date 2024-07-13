"use client"
import * as z from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Attachment, Institution } from '@prisma/client'
import FileUpload from '@/components/file-upload'
import { useAuth } from '@clerk/nextjs'

interface AttachmentInstitutionFormProps {
    initialData : Institution & { supportingDocuments : Attachment[] };
    institutionId : string
}

const formSchema = z.object(
    {
        url : z.string().min(1),
    }
)

const AttachmentInstitutionForm = ({
    initialData,
    institutionId
} : AttachmentInstitutionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const {userId} = useAuth()
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/users/${userId}/institutions/${institutionId}/attachments`, values)
            toast.success("Institution Updated Successfully")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    };

    const onDelete = async (id : string ) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/users/${userId}/institutions/${institutionId}/attachments/${id}`)
            toast.success("Attachment deleted")
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
            <div className="flex font-medium items-center justify-between">
                Institution Attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && (
                        <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add file
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.supportingDocuments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachments yet
                        </p>
                    )}
                    {initialData.supportingDocuments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.supportingDocuments.map((attachment) => (
                                <div
                                key={attachment.id}
                                className="flex rounded-md bg-sky-100 items-center p-3 w-full border border-sky-200 text-sky-700">
                                    <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                                    <p className="text-xs line-clamp-1">
                                        {attachment.name}
                                    </p>
                                    {
                                        deletingId === attachment.id && (
                                            <div>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        )
                                    }
                                    {
                                        deletingId !== attachment.id && (
                                            <button
                                            className="ml-auto hover:opacity-75 transition"
                                            onClick={() => onDelete(attachment.id)}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url : url})
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add anything your students might need to complete the course
                    </div>
                </div>
            )}
        </div>
    )
}

export default AttachmentInstitutionForm