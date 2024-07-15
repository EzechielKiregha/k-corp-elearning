"use client"

import { ConfirmModalCheckout } from '@/components/modals/confirm-modal-checkout';
import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/format';
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';

interface SubscriptionButtonProps {
    price : number;
    userId : string;
}

const SubscriptionButton = ({
    price,
    userId
} : SubscriptionButtonProps) => {

    const [isLoading, setIsLoading] = useState(false)
    const onClick = async () => {
        try {
            setIsLoading(true);
            
            const response = await axios.post(`/api/users/${userId}/checkout`)
            
            window.location.assign(response.data.url);
        } catch {
            
            toast.error("Something Went Wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ConfirmModalCheckout onConfirm={onClick} price={price}>
            <Button
                className='w-full md:w-auto'
                size="sm"
                disabled={isLoading}
                >
                Activate & checkout
            </Button>
        </ConfirmModalCheckout>
    )
}

export default SubscriptionButton