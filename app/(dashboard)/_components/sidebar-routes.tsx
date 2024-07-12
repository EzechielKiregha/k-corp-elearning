"use client";

import { BarChart,
    Code2,
    Compass,
    Layout,
    List,
    Rabbit,
    Twitter,
    User, 
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon : Layout,
        label : "Dashboard",
        href : "/dashboard"
    },
    {
        icon : Compass,
        label : "Browse",
        href : "/search"
    },
    {
        icon : Twitter,
        label : "Community",
        href : "/community"
    },
    {
        icon : Rabbit,
        label : "Rabbit Events",
        href : "/rabbit-events"
    },
    {
        icon : Code2,
        label : "Hackathons",
        href : "/hackathons"
    },
    {
        icon : User,
        label : "Profile",
        href : "/profile/user"
    },
]

const teacherRoutes = [
    {
        icon : List,
        label : "Courses",
        href : "/teacher/courses"
    },
    {
        icon : BarChart,
        label : "Analytics",
        href : "/teacher/analytics"
    },
    {
        icon : User,
        label : "Profile",
        href : "/profile/user"
    },
]

const SideRoutes = () => {

    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {
                routes.map((route) => (
                    <SidebarItem 
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
            
        </div>
    )
}

export default SideRoutes