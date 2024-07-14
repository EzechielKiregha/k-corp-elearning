"use client"
import { UserButton, useAuth } from "@clerk/nextjs"; 
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { CheckCircle, CheckCircle2, CircleAlertIcon, CircleHelp, LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

import { isTeacher  } from "@/lib/isTeacher";
import { ThemeToggle } from "./theme-toggle";
import { useUser } from "@/hooks/use-User";
import { FcAdvance, FcApproval, FcApprove, FcBookmark } from "react-icons/fc";
import { useNavigation } from "@/hooks/useNavigation";

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
                user?.subscriptionPlan === "Ultimate Enterprise Plan"
                ) ? (
                <Button 
                    className='border-b border-slate-900 dark:border-sky-300'
                    variant="ghost">
                    | <FcApprove/>
                    {user.subscriptionPlan} |
                </Button>) : null
        }
            <div className="flex gap-x-2 ml-auto">
                {
                    isTeacherPage || isCoursePage ?
                    (
                        <Button onClick={() => nav('/dashboard')} size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    ) : isTeacher(user!) === true && (
                        user?.subscriptionPlan === "Pro MemberShip" ||
                        user?.subscriptionPlan === "Student Free MemberShip" ||
                        user?.subscriptionPlan === "Ultimate Enterprise Plan"
                        ) ? (
                        <Button onClick={() => nav('/teacher/courses')} size="sm" variant="ghost">
                            | <CheckCircle/> Teach Mode  |
                        </Button>) : (
                            <Button onClick={() => nav('/profile/user')} size="sm" variant="link">
                                | Activate Account |
                            </Button>
                        )
                }
                <ThemeToggle/>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </>
    )
}

export default NavbarRoutes