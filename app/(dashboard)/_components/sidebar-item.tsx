"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";
import { IceCreamCone, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon : LucideIcon;
    label : string;
    href :  string;
}

const SidebarItem = ({
    icon : Icon,
    label,
    href
} : SidebarItemProps) => {

    const pathname = usePathname()
    const nav = useNavigation()

    const isActive = 
    ( pathname === "/" && href === "/" ) || pathname === href || pathname?.startsWith(`$(href)/`)

    return (
        <button 
            onClick={() => nav(`${href}`)}
            type="button"
            className={ cn(
                "flex items-center gap-x-2 text-slate-900 dark:text-slate-300 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-300/20 dark:hover:text-sky-300 dark:hover:bg-slate-700",
                isActive && "text-sky-700 bg-sky-200/20 hover:text-sky-700 hover:bg-sky-200/20 dark:text-sky-500 dark:bg-slate-800 dark:hover:text-sky-300 dark:hover:bg-slate-700"
            ) }
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon 
                    size={22}
                    className={ cn(
                        "dark:text-slate-300 text-slate-900",
                        isActive && "text-sky-500 dark:text-sky-500"
                    ) }
                />
                {label}
            </div>
            <div 
            className={ cn(
                "opacity-0 border-2 ml-auto border-sky-700 transition-all h-full",
                isActive && "opacity-100"
            ) }
            /> 
        </button>
    )
}

export default SidebarItem