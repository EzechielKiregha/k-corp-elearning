"use client"

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import { useAuth } from '@clerk/nextjs'
import SubscriptionButton from './subscrption-button'
import { useNavigation } from '@/hooks/useNavigation'

interface InstitutionActionsProps {
    disabled : boolean;
    institutionId : string;
    isActivated : boolean
}
const InstitutionActions = ({
    disabled,
    institutionId,
    isActivated
} : InstitutionActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();
    const nav = useNavigation();
    const { userId } = useAuth();

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isActivated){
                await axios.patch(`/api/users/${userId}/institutions/${institutionId}`);
                toast.success("Institution disactivated")
            } else {
                await axios.patch(`/api/users/${userId}/institutions/${institutionId}`);
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
            await axios.delete(`/api/users/${userId}/institutions/${institutionId}`);
            toast.success("Institution Deleted");
            router.refresh();
            nav(`/profile/user`);
        } catch{
            toast.error("Something Went Wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            
            {isActivated ? (
                <Button 
                    // onClick={onClick}
                    disabled={disabled}
                    variant="outline"
                    size="sm"
                >
                    Activated
                </Button>
            ) : (
                <SubscriptionButton userId={userId!} price={68.99}/>
            )}
            
            
            <ConfirmModal onConfirm={onDelete}>
                <Button className='text-sm'>
                    <Trash className='h-4 w-4'/>
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default InstitutionActions