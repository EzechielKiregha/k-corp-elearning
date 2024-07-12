"use client";

import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect} from 'react'
import { navItems } from '../constants'
import { UserButton, useAuth } from '@clerk/nextjs';
import Logo from './logo';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { isTeacher } from '@/lib/isTeacher';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-User';


const MainNavbar = () => {

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false);
    const [mounted, setMounted] = useState(false)
    

    const {userId} = useAuth();
    const user = useUser(userId)

    useEffect(() => {
        setIsLogin(!!userId);
        setMounted(true)
    }, [userId]);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }
    if (!mounted) {
        return null
    }
    return (
        <nav className="sticky top-0 z-50 py-2 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-2 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                    <div className="px-2 py-0">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-6">
                        {navItems.map( (item, index) => (
                            <li key={index}>
                                <Link
                                    className='hover:text-sky-600'
                                    href={item.href }
                                >
                                    {item.label === "Teach Mode" ? (

                                        isTeacher(user!) === true ? (
                                                <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                                                    |  {item.label}  |
                                                </span>
                                                )
                                        : (
                                            "| Start Teaching |"
                                        )
                                        
                                    ) : (
                                        item.label
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {!isLogin ? (
                        <div className="hidden lg:flex justify-center space-x-6 items-center ">
                            <ThemeToggle/>
                            <a href="/sign-in" className='py-2 px-2 border rounded-md border-sky-700 dark:border-slate-200 dark:text-slate-200 text-sky-700 dark:hover:text-sky-500 dark:hover:border-sky-500'> Sign In </a>
                            <a href="/sign-up" className="py-2 px-2 rounded-md bg-gradient-to-r 
                                from-sky-950 to-sky-600 text-slate-200">Create an account</a>
                        </div>
                    ):(
                        <>
                        <div className="hidden lg:flex justify-center space-x-12 items-center">
                            <ThemeToggle/>
                            <UserButton/>
                            <Link href="/dashboard" >
                                <button className="py-2 px-3 rounded-md bg-gradient-to-r 
                                from-sky-950 to-sky-600 text-slate-200">
                                    Dashboard
                                </button>
                            </Link>
                        </div>
                        </>
                    )}
                    
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <ThemeToggle/>
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu/>}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="flex flex-col justify-center fixed right-0 z-20 bg-slate-100 dark:bg-slate-900
                    text-slate-900 dark:text-slate-200 
                    w-full p-12 items-center lg:hidden">
                        <ul>
                        {navItems.map( (item, index) => (
                            <li key={index}>
                                <Link
                                    className='hover:text-sky-600'
                                    href={item.label === "Teach Mode" && item.key === 4 ? item.href : "/teacher/courses"  }
                                >
                                    {item.label === "Teach Mode" ? (

                                        isTeacher(user!) === true ? (
                                                <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                                                    |  {item.label}  |
                                                </span>
                                                )
                                        : (
                                            "| Start Teaching |"
                                        )
                                        
                                    ) : (
                                        item.label
                                    )}
                                </Link>
                            </li>
                        ))}
                        </ul>
                        {!isLogin ? (
                            <div className="flex space-x-6 items-center ">
                                <a href="/sign-in" className='py-2 px-3 border rounded-md border-sky-800 text-sky-800 '> Sign In </a>
                                <a href="/sign-up" className="py-2 px-3 rounded-md bg-gradient-to-r 
                                   from-sky-950 to-sky-600 text-slate-200"> Create an account</a>
                            </div>
                        ):(
                            <div className="flex space-x-6">
                                <UserButton/>
                                <Link href="/dashboard" className="py-2 px-3 rounded-md bg-gradient-to-r 
                                    from-sky-950 to-sky-600 text-slate-200">Dashboard</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </nav>

    )
}

export default MainNavbar