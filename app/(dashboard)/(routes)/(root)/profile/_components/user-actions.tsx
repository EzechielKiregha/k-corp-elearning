"use client"

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useConfettiStore } from '@/hooks/use-confetti-store'

interface UserActionsProps {
    disabled : boolean;
    userId : string;
    isDeleted : boolean
}
const UserActions = ({
    disabled,
    userId,
    isDeleted
} : UserActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isDeleted){
                await axios.patch(`/api/users/${userId}`);
                toast.success("Institution disactivatef")
            } else {
                await axios.patch(`/api/users/${userId}`);
                toast.success("Institution Activate");
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
            await axios.delete(`/api/users/${userId}`);
            toast.success("Institution Deleted");
            router.refresh();
            // nav(`/users`);
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
                {isDeleted ? "DisDeleted" : "Activated"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button className='text-sm'>
                    <Trash className='h-4 w-4'/>
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default UserActions