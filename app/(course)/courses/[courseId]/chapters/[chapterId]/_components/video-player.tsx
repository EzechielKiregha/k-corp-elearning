"use client"

import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import { Loader2, Lock } from "lucide-react"
import { useState } from "react"

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


    return (
        <div className="relative aspect-video">
            { !isReady && !isLocked && (
                <div className="flex items-center justify-center absolute inset-0 bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                </div>
            )}
            {isLocked && (
                <div className="flex items-center flex-col gap-y-2 text-secondary justify-center absolute inset-0 bg-slate-800">
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
                    onEnded={() => {}}
                    // autoPlay
                    playbackId={playbackId}
                />
            )}
        </div>
    )
}

export default VideoPlayer