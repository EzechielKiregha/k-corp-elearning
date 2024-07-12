"use client"
import { UserButton, useAuth } from "@clerk/nextjs"; 
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

import { isTeacher  } from "@/lib/isTeacher";
import { ThemeToggle } from "./theme-toggle";
import { useUser } from "@/hooks/use-User";
import { FcBookmark } from "react-icons/fc";

const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    const user = useUser(userId);

    return (
        <>
        {
            isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )
        }
            <div className="flex gap-x-2 ml-auto">
                {
                    isTeacherPage || isCoursePage ?
                    (
                        <Link href="/dashboard">
                            <Button size="sm" variant="ghost">
                                <LogOut className="h-4 w-4 mr-2" />
                                Exit
                            </Button>
                        </Link>
                    ) : isTeacher(user!) === true ? (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            | <FcBookmark/>
                            Teach Mode |
                        </Button>
                    </Link>) : null
                }
                <ThemeToggle/>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </>
    )
}

export default NavbarRoutes