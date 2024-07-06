"use client"
import MuxPlayer from '@mux/mux-player-react'
import * as z from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter, MuxData } from '@prisma/client'
import FileUpload from '@/components/file-upload'
import Image from 'next/image'
// import { checkMuxVideoExists } from '@/lib/muxUtils'

interface ChapterVideoFormProps {
    initialData : Chapter & { muxData : MuxData | null}
    courseId : string
    chapterId : string
}

const formSchema = z.object(
    {
        videoUrl : z.string().min(1)
    }
)

const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
} : ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const [videoExists, setVideoExists] = useState<boolean>(false);
    const [playbackId, setPlaybackId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Course Updated Successfully")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
        const checkVideoStatus = async () => {
            if (initialData?.muxData?.assetId) {
                try {
                    const { data } = await axios.get(`/api/mux/asset?assetId=${initialData.muxData.assetId}`);
                    setVideoExists(data.exists);
                    if (data.exists && data.playbackIds.length > 0) {
                        setPlaybackId(data.playbackIds[0]);
                    }
                    console.log("Video status:", data);
                } catch (error) {
                    console.error('Error checking video status:', error);
                }
            }
        }

        checkVideoStatus();
    }, [initialData]);

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
            <div className="flex font-medium items-center justify-between">
                Chapter video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && !initialData.videoUrl ? (
                        <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add video
                        </>
                    ): !isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit video
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 rounded-md bg-slate-200">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : videoExists && playbackId ? (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                            playbackId={playbackId}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-60 rounded-md dark:bg-slate-700 dark:text-slate-200 bg-slate-200">
                        <p>Video unavailable for now</p>
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) =>  {
                            if (url) {
                                onSubmit({ videoUrl : url})
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this chapter&apos;s video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    This video can take few minutes to process. refresh the page if the video does not apear.
                </div>
            )}
        </div>
    )
}

export default ChapterVideoForm