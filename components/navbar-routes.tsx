"use client"
import { UserButton, useAuth } from "@clerk/nextjs"; 
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft, CheckCircle, LogOut, User } from "lucide-react";
import SearchInput from "./search-input";

import { isTeacher  } from "@/lib/isTeacher";
import { ThemeToggle } from "./theme-toggle";
import { useUser } from "@/hooks/use-User";
import { useNavigation } from "@/hooks/useNavigation";
import { ActivateAccountModal } from "./modals/ActivateAccountModal";
import IconBadge from "./icon-badge";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";
import { useBusiness } from "@/hooks/use-Business";

const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    const nav = useNavigation()

    const user = useUser(userId);
    const institution = useBusiness(user?.institutionId!, user?.id)

    return (
        <>
        {
            isSearchPage ? (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            ) : isTeacher(user!) === true && (
                user?.subscriptionPlan.includes("Pro") ||
                user?.subscriptionPlan.includes("Free") ||
                user?.subscriptionPlan.includes("Enterprise") ||
                user?.subscriptionPlan.includes("Ultimate")
                ) ? (
                <Button 
                    className='hidden md:block border-b border-slate-900 dark:border-sky-300'
                    variant="ghost"
                    size="sm"
                    >
                    Current Plan | {user.subscriptionPlan} |
                </Button>
                ) : (
                    <Button 
                    className='hidden md:block border-b border-slate-900 dark:border-sky-300'
                    variant="ghost"
                    size="sm"
                    >
                    Current Plan | {user?.subscriptionPlan} |
                </Button>
                )
        }
            <div className="flex gap-x-2 ml-auto">
                {
                    isTeacherPage || isCoursePage ?
                    (
                        <Button  onClick={() => nav('/dashboard')} size="sm" variant="link">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            exit
                        </Button>
                    ) : isTeacher(user!) === true && (
                        user?.subscriptionPlan.includes("Pro") ||
                        user?.subscriptionPlan.includes("Enterprise") ||
                        user?.subscriptionPlan.includes("Ultimate")
                        ) ? (
                        <Button onClick={() => nav('/teacher/courses')} 
                            className='border-b border-slate-900 dark:border-sky-300'
                            variant="ghost"
                            size="sm"
                            >
                            | Teach Mode  |
                        </Button>
                        ) : !institution ? (
                            <ActivateAccountModal onConfirm={() => nav('/profile/user')}>
                                <Button 
                                    className='border-b border-slate-900 dark:border-sky-300'
                                    variant="ghost" 
                                    size="sm"
                                    >
                                        | Activate Account |
                                </Button>
                            </ActivateAccountModal>
                        ) : user?.subscriptionPlan.includes("Free") && user?.role !== "STUDENT" && (
                            <Button onClick={() => nav('/teacher/courses')} 
                                className='border-b border-slate-900 dark:border-sky-300'
                                variant="ghost"
                                size="sm"
                                >
                                | My Courses |
                            </Button>
                        )
                }
                <ThemeToggle/>
                <Button 
                    onClick={() => nav('/profile/user')}
                    variant="ghost"
                    size="icon"
                    className='border-b mr-2 border-slate-900 dark:border-sky-300'
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
            </div>
        </>
    )
}

export default NavbarRoutes