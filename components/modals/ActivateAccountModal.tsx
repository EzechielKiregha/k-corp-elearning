"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface ActivateAccountModalProps {
    children : React.ReactNode;
    onConfirm : () =>  void;
}

export const ActivateAccountModal = ({
    children,
    onConfirm
} : ActivateAccountModalProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Activate Account & Checkout 
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Upgrade to Pro or to the Ultimate Enterprise Plan
                        You Became Pro Member, Instructor And Owner Your Institution at K-Corp eLearning Platform. 
                        Create up to [ 200 + ] courses.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Go to profile 
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}