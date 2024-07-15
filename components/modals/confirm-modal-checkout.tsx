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

interface ConfirmModalCheckoutProps {
    children : React.ReactNode;
    onConfirm : () =>  void;
    price : number;
}

export const ConfirmModalCheckout = ({
    children,
    onConfirm,
    price
} : ConfirmModalCheckoutProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        activation & checkout
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        For activation you need to checkout for your subscription.
                        <h2>Pay {price} only.</h2>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}