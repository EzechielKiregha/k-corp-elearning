// components/UserPaymentStatusHandler.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import toast from 'react-hot-toast';
import axios from 'axios';

interface props {
    userId : string | null;
    institutionId : string | null;
}

const UserPaymentStatusHandler = ({ userId, institutionId }: props ) => {
    const searchParams = useSearchParams();
    const confetti = useConfettiStore();
    const router = useRouter();

    useEffect(() => {
        const handlePaymentStatus = async () => {
        const success = searchParams.get('success');
        const canceled = searchParams.get('canceled');

        if (success === '2') {
            try {
            const res = await axios.patch(`/api/users/${userId}/activated`, { success: success, institutionId });
            if (res.status === 200) {
                confetti.onOpen();
                router.replace(`/profile/user`)
                // toast.success("You've successfully Activated Your Institution.");
            }
            } catch (error) {
                console.error('Error activating institution:', error);
                // toast.error('Failed to activate institution');
                router.replace(`/profile/user`)
                router.refresh()
            }
        } else if (canceled === '2') {
            console.log('Payment was canceled');
            toast.error("You've Canceled The Activation of Your Institution.");
        }
        };

        handlePaymentStatus();
    }, [searchParams, userId, institutionId, confetti]);

    return null; // This component doesn't render anything
    };

export default UserPaymentStatusHandler;