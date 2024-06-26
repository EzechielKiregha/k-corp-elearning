import React from 'react'
import Image from 'next/image'

const Logo = () => {
    return (
        <Image
            height={130}
            width={150}
            alt='logo'
            src="/logo.png"
        />
    )
}

export default Logo