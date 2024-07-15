'use client'

import { useClerk } from '@clerk/nextjs';
import { ConfirmModalLogout } from './modals/confirm-modal-logout';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';

export const SignOutButton = () => {
    const { signOut } = useClerk();
    const nav = useNavigation();

    return (
        <ConfirmModalLogout onConfirm={() => (
            signOut({redirectUrl : '/'})
        )}>
            <Button 
                className='border-b border-slate-900 dark:border-sky-500'
                variant="ghost"
            >
                <LogOut size={20}/> 
            </Button>
        </ConfirmModalLogout>
    );
};