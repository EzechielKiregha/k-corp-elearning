// hooks/useNavigation.ts
import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLoading } from '../contexts/loadingContext'


export const useNavigation = () => {
    const router = useRouter()
    const { setIsLoading } = useLoading()
    const pathname = usePathname();

    const navigate = useCallback((href: string) => {
        
        if (pathname === href) {
            
        } else {
            setIsLoading(true)
            router.push(href)
            router.refresh()
        }
    }, [router, setIsLoading])

    return navigate
}