// hooks/useNavigation.ts
import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLoading } from '../contexts/loadingContext'

export const useNavigation = () => {
    const router = useRouter()
    const { setIsLoading } = useLoading()
    const pathname = usePathname();

    const navigate = useCallback((href: string) => {
        setIsLoading(true)
        router.push(href)
        if (pathname === href) setIsLoading(false)
    }, [router, setIsLoading])

    return navigate
}