"use client"

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useConfettiStore } from '@/hooks/use-confetti-store'

interface ActionsProps {
    disabled : boolean;
    courseId : string;
    isPublished : boolean
}
const Actions = ({
    disabled,
    courseId,
    isPublished
} : ActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course Unpublished")
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen();
            }

            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        } finally{
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course Deleted");
            router.refresh();
            router.push(`/teacher/courses`);
        } catch{
            toast.error("Something Went Wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button 
                onClick={onClick}
                disabled={disabled}
                variant="outline"
                size="sm"
            >
                {isPublished ? "unPublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button className='text-sm'>
                    <Trash className='h-4 w-4'/>
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default Actions