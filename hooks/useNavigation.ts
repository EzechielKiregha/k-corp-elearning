// hooks/useNavigation.ts
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLoading } from '../contexts/loadingContext'

export const useNavigation = () => {
    const router = useRouter()
    const { setIsLoading } = useLoading()

    const navigate = useCallback((href: string) => {
        setIsLoading(true)
        router.push(href)
    }, [router, setIsLoading])

    return navigate
}