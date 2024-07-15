"use client"
import { UserButton, useAuth } from "@clerk/nextjs"; 
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { CheckCircle, LogOut, User } from "lucide-react";
import SearchInput from "./search-input";

import { isTeacher  } from "@/lib/isTeacher";
import { ThemeToggle } from "./theme-toggle";
import { useUser } from "@/hooks/use-User";
import { useNavigation } from "@/hooks/useNavigation";
import { ActivateAccountModal } from "./modals/ActivateAccountModal";
import IconBadge from "./icon-badge";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";

const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    const nav = useNavigation()

    const user = useUser(userId);

    return (
        <>
        {
            isSearchPage ? (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            ) : isTeacher(user!) === true && (
                user?.subscriptionPlan === "Pro MemberShip" ||
                user?.subscriptionPlan === "Student Free MemberShip" ||
                user?.subscriptionPlan === "Ultimate Enterprise Plan" ||
                user?.subscriptionPlan.includes("Ultimate")
                ) ? (
                <Button 
                    className='hidden md:block border-b border-slate-900 dark:border-sky-300'
                    variant="ghost"
                    size="sm"
                    >
                    Current Plan | {user.subscriptionPlan} |
                </Button>) : null
        }
            <div className="flex gap-x-2 ml-auto">
                {
                    isTeacherPage || isCoursePage ?
                    (
                        <Button  onClick={() => nav('/dashboard')} size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    ) : isTeacher(user!) === true && (
                        user?.subscriptionPlan === "Pro MemberShip" ||
                        user?.subscriptionPlan === "Student Free MemberShip" ||
                        user?.subscriptionPlan === "Ultimate Enterprise Plan"
                        ) ? (
                        <Button onClick={() => nav('/teacher/courses')} 
                            className='border-b border-slate-900 dark:border-sky-300'
                            variant="ghost"
                            size="sm"
                            >
                            | Teach Mode  |
                        </Button>
                        ) : (
                            <ActivateAccountModal onConfirm={() => nav('/profile/user')}>
                                <Button 
                                    className='border-b border-slate-900 dark:border-sky-300'
                                    variant="ghost" 
                                    size="sm"
                                    >
                                        | Activate Account |
                                </Button>
                            </ActivateAccountModal>
                        )
                }
                <ThemeToggle/>
                <Button 
                    onClick={() => nav('/profile/user')}
                    variant="ghost"
                    size="icon"
                    className='border-b mr-6 border-slate-900 dark:border-sky-300'
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
                {/* <SignOutButton/> */}
            </div>
        </>
    )
}

export default NavbarRoutes