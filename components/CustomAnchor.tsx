// components/TGa.tsx
'use client'

import { useLoading } from '@/contexts/loadingContext'
import { useNavigation } from '@/hooks/useNavigation'
import { useRouter } from 'next/navigation'
interface TGaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    children: React.ReactNode
}

const TGa: React.FC<TGaProps> = ({ href, children, ...props }) => {
    const router = useRouter()
    const { setIsLoading } = useLoading();
    const nav = useNavigation();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsLoading(true)
        nav(href)
    }

    return (
        <a href={href} onClick={handleClick} {...props}>
        {children}
        </a>
    )
}

export default TGa