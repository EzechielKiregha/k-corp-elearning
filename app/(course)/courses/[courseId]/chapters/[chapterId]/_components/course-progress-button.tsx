'use client'

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

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

    const Icon = isCompleted ? XCircle : CheckCircle
    return (
        <Button
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Not Completed" : "Mark as completed"}

        </Button>
    )
}

export default CourseProgressButton