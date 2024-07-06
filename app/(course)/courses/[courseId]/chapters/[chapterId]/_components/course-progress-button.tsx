'use client'

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
    courseId : string;
    chapterId : string ;
    nextChapterId? : string;
    isCompleted? : boolean;
}

const CourseProgressButton = ({
    courseId,
    chapterId,
    nextChapterId,
    isCompleted,
} : CourseProgressButtonProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const confetti = useConfettiStore();

    const onClick = async () =>{
        try {
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted : !isCompleted
            })

            if(!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if(!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

            toast.success("Progress Updated");
            router.refresh();



        } catch (error) {
            toast.error("Something Went Wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle
    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={isLoading}
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Not Completed" : "Mark as completed"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
    )
}

export default CourseProgressButton