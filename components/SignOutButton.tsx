'use client'

import { useClerk } from '@clerk/nextjs';
import { ConfirmModalLogout } from './modals/confirm-modal-logout';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export const SignOutButton = () => {
    const { signOut } = useClerk();

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