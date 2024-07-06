'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const Logo = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Image
                height={130}
                width={150}
                alt='logo'
                src="/logo.png"  // Default logo
            />
        )
    }

    const logoSrc = resolvedTheme === 'dark' ? '/logo-white.png' : '/logo.png'

    return (
        <Image
            height={130}
            width={150}
            alt='logo'
            src={logoSrc}
        />
    )
}

export default Logo