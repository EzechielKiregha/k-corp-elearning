"use client";

import { Menu, X, Sun, Moon, Layout, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect} from 'react'
import { navItems } from '../constants'
import { UserButton, useAuth } from '@clerk/nextjs';
import Logo from './logo';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { isTeacher } from '@/lib/isTeacher';
import { useUser } from '@/hooks/use-User';
import { useNavigation } from '@/hooks/useNavigation';
import TGlink from '@/components/CustomLink';
import TGa from '@/components/CustomAnchor';
import { Button } from '@/components/ui/button';
import { FcApproval, FcApprove } from 'react-icons/fc';
import { ConfirmModalLogin } from '@/components/modals/confirm-modal copy';
import IconBadge from '@/components/icon-badge';
import Image from 'next/image';
import { SignOutButton } from '@/components/SignOutButton';


const MainNavbar = () => {

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false);
    const [mounted, setMounted] = useState(false);
    const nav = useNavigation()
    

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
        <nav className="sticky top-0 z-50 py-0 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-2 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                    <div className="px-2 py-0">
                        <TGlink href="/">
                            <Logo />
                        </TGlink>
                    </div>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-2">
                        {navItems.map( (item, index) => (
                            <li key={index}>
                                <TGlink
                                    className='hover:text-sky-600'
                                    href={item.href }
                                >
                                {item.label === "Teach Mode" ? (

                                    isTeacher(user!) === true && (
                                        user?.subscriptionPlan.includes("Pro") ||
                                        user?.subscriptionPlan.includes("Free") ||
                                        user?.subscriptionPlan.includes("Enterprise") ||
                                        user?.subscriptionPlan.includes("Ultimate")
                                        ) ? (
                                        <Button 
                                            className='border-b border-slate-900 dark:border-sky-300'
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => nav('/teacher/courses')}
                                            > 
                                            <FcApproval/>
                                            | Teach Mode |
                                        </Button>) 
                                        : user?.subscriptionPlan && user?.role !== "STUDENT" && (
                                            <Button
                                                size="sm"
                                                className=' border-b border-slate-900 dark:border-sky-300'
                                                variant="link">
                                                <FcApproval />
                                                {user?.subscriptionPlan}
                                            </Button>
                                            )
                                    ) : (
                                        <Button size="sm" variant="link">
                                            {item.label}
                                        </Button>
                                    ) }
                                </TGlink>
                            </li>
                        ))}
                    </ul>
                    {!isLogin ? (
                        <div className="hidden lg:flex justify-center space-x-6 items-center ">
                            <ThemeToggle/>
                            <Button size="sm" onClick={() => nav('/sign-in')} variant="link" className="bg-gradient-to-r text-slate-200 from-sky-950 to-sky-600 px-3 py-2
                            rounded-md ">Sign In</Button>
                            <Button size="sm" onClick={() => nav('/sign-up')} variant="link" className="bg-gradient-to-r text-slate-200 from-sky-950 to-sky-600 px-3 py-2
                            rounded-md ">Sign Up</Button>
                        </div>
                    ):(
                        <>
                        <div className="hidden lg:flex lg:flex-row md:flex md:flex-row justify-center space-x-4 items-center">
                            <ThemeToggle/>
                            <Button 
                                onClick={() => nav('/profile/user/')}
                                variant="ghost"
                                size="icon"
                                className='border-b border-slate-900 dark:border-sky-300'
                                >
                                {!user?.imageUrl ? (
                                    <IconBadge size="sm" icon={User}/>
                                ) : (
                                    <Image 
                                        src={user?.imageUrl!} 
                                        alt={user?.username!}
                                        width={32}
                                        height={32} 
                                        className="w-8 h-8 rounded-full border border-slate-300"
                                    />
                                )}
                            </Button>
                            
                            <Button size="sm" variant="link" onClick={() => nav('/dashboard')} className="py-2 px-3 rounded-md bg-gradient-to-r 
                            from-sky-950 to-sky-600 text-slate-200">
                                Dashboard
                            </Button>
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
                                <TGlink
                                    className='hover:text-sky-600'
                                    href={item.href }
                                >
                                {item.label === "Teach Mode" ? (

                                    isTeacher(user!) === true && (
                                        user?.subscriptionPlan.includes("Pro") ||
                                        user?.subscriptionPlan.includes("Free") ||
                                        user?.subscriptionPlan.includes("Enterprise") ||
                                        user?.subscriptionPlan.includes("Ultimate")
                                        ) ? (
                                        <Button 
                                            className='border-b border-slate-900 dark:border-sky-300'
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => nav('/teacher/courses')}
                                            > 
                                            <FcApproval/>
                                            | Teach Mode |
                                        </Button>) 
                                        : user?.subscriptionPlan && user?.role !== "STUDENT" && (
                                            <Button
                                                size="sm"
                                                className=' border-b border-slate-900 dark:border-sky-300'
                                                variant="link">
                                                <FcApproval />
                                                {user?.subscriptionPlan}
                                            </Button>
                                            )
                                    ) : (
                                        <Button size="sm" variant="link">
                                            {item.label}
                                        </Button>
                                    ) }
                                </TGlink>
                            </li>
                        ))}
                        </ul>
                        {!isLogin ? (
                            <div className="flex space-x-6 items-center ">
                                <Button size="sm" onClick={() => nav('/sign-in')} variant="link" className="bg-gradient-to-r text-slate-200 from-sky-950 to-sky-600 px-3 py-2
                                rounded-md ">Sign In</Button>
                                <Button size="sm" onClick={() => nav('/sign-up')} variant="link" className="bg-gradient-to-r text-slate-200 from-sky-950 to-sky-600 px-3 py-2
                                rounded-md ">Sign Up</Button>
                            </div>
                        ):(
                            <div className="flex space-x-12">
                                <Button 
                                    onClick={() => nav('/profile/user/')}
                                    variant="ghost"
                                    size="icon"
                                    className='border-b border-slate-900 dark:border-sky-300'
                                    >
                                    {!user?.imageUrl ? (
                                        <IconBadge size="sm" icon={User}/>
                                    ) : (
                                        <Image 
                                            src={user?.imageUrl!} 
                                            alt={user?.username!}
                                            width={32}
                                            height={32} 
                                            className="w-8 h-8 rounded-full border border-slate-300"
                                        />
                                    )}
                                </Button>
                                <Button size="sm" onClick={() => nav('/dashboard')} variant="link" className="bg-gradient-to-r text-slate-200 from-sky-950 to-sky-600 px-3 py-2
                                rounded-md ">Dashboard</Button>
                            </div>
                            
                        )}
                    </div>
                )}
            </div>

        </nav>

    )
}

export default MainNavbar