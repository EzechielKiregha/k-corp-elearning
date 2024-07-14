"use client"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import { useNavigation } from "@/hooks/useNavigation"
import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import axios from "axios"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface VideoPlayerProps {
    chapterId : string,
    courseId : string,
    title : string,
    nextChapterId? : string,
    playbackId : string,
    isLocked : boolean,
    completeOnEnd : boolean
}

const VideoPlayer = ({
    chapterId,
    courseId,
    playbackId,
    title,
    nextChapterId,
    isLocked,
    completeOnEnd
} : VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();
    const nav = useNavigation();

    const onEnded = async () =>{
        try {

            if(completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted : true,
                })
                if(!nextChapterId) {
                    confetti.onOpen();
                }
                
                toast.success("Progress Updated");
                router.refresh();
                if(nextChapterId) {
                    nav(`/courses/${courseId}/chapters/${nextChapterId}`)
                }

                
            }

        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <div className="relative aspect-video">
            { !isReady && !isLocked && (
                <div className="flex items-center justify-center absolute inset-0 bg-slate-800 ">
                    <Loader2 className="h-10 w-10 animate-spin text-secondary dark:text-primary"/>
                </div>
            )}
            {isLocked && (
                <div className="flex items-center dark:bg-slate-200 dark:text-slate-900 flex-col gap-y-2 text-secondary justify-center absolute inset-0 bg-slate-800">
                    <Lock className="h-8 w-8 "/>
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(
                        !isReady && "hidden"
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnded}
                    autoPlay
                    playbackId={playbackId}
                />
            )}
        </div>
    )
}

export default VideoPlayer