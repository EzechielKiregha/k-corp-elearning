import React from 'react'
import { communityLinks, platformLinks, resourcesLinks } from '../constants'
import Link from 'next/link'
import Logo from '@/app/(dashboard)/_components/logo'
import TGlink from '@/components/CustomLink'
import TGa from '@/components/CustomAnchor'

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-slate-700 flex flex-col justify-center ">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4  md:items-center ">
                <div className='md:px-6 md:mx-auto'>
                    <h3 className="text-md font-semibold mb-4">
                        Resources
                    </h3>
                    <ul className="space-y-2">
                        {resourcesLinks.map((link, index) => (
                            <li key={index}>
                                <TGa 
                                className="text-neutral-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-500"
                                href={link.href}> {link.text} </TGa>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='md:px-6 md:mx-auto'>
                    <h3 className="text-md font-semibold mb-4">
                        Platforms
                    </h3>
                    <ul className="space-y-2">
                        {platformLinks.map((link, index) => (
                            <li key={index}>
                                <TGa 
                                className="text-neutral-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-500"
                                href={link.href}> {link.text} </TGa>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='md:px-6 md:mx-auto'>
                    <h3 className="text-md font-semibold mb-4">
                        Community
                    </h3>
                    <ul className="space-y-2">
                        {communityLinks.map((link, index) => (
                            <li key={index}>
                                <TGa 
                                className="text-neutral-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-500"
                                href={link.href}> {link.text} </TGa>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="px-6 py-2 items-center justify-center flex">
                <TGlink href="/">
                    <Logo />
                </TGlink>
            </div>

        </footer>
    )
}

export default Footer