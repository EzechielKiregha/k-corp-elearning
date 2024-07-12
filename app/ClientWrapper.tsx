// app/ClientWrapper.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import LoadingSpinner from '@/components/LoadingSpinner'
import { NavigationEvents } from '@/components/NavigationEvents'
import { useLoading } from '@/contexts/loadingContext'

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoading } = useLoading()

    return (
        <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            {isLoading && <LoadingSpinner />}
            {children}
            <NavigationEvents/>
        </NextThemesProvider>
        </NextUIProvider>
    )
}