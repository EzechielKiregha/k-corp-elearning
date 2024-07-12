// components/TGa.tsx
'use client'

import { useLoading } from '@/contexts/loadingContext'
import { useRouter } from 'next/navigation'
interface TGaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    children: React.ReactNode
}

const TGa: React.FC<TGaProps> = ({ href, children, ...props }) => {
    const router = useRouter()
    const { setIsLoading } = useLoading()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsLoading(true)
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} {...props}>
        {children}
        </a>
    )
}

export default TGa