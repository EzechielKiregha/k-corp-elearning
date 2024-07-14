"use client";

import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';
import { CircleCheck, Lock, PlayCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface CourseSidebarItemProps {
    label : string;
    id : string; 
    isCompleted : boolean;
    courseId : string;
    isLocked : boolean;
}

const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
}:CourseSidebarItemProps) => {

    const pathName = usePathname()
    const router = useRouter()
    const nav = useNavigation();

    const Icon = isLocked ? Lock : (isCompleted ? CircleCheck : PlayCircle);

    const isActive = pathName?.includes(id)

    return (
        <button
            onClick={() => nav(`/courses/${courseId}/chapters/${id}`)}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-sm text-slate-300 font-[500] pl-6 transition-all hover:text-slate-200 hover:bg-slate-300/20 ",
                isActive && "dark:bg-slate-800 hover:text-slate-700 hover:bg-slate-200/20 text-slate-700 dark:hover:text-slate-200 dark:hover:bg-slate-600 dark:text-slate-200 ",
                isCompleted && "text-emerald-700 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
                isCompleted && isActive && "bg-emerald-200/20 dark:bg-emerald-900/20"
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <Icon 
                    className={cn(
                        "text-slate-500 ",
                        isActive && " text-slate-700 dark:text-slate-200 ",
                        isCompleted && " text-emerald-700 dark:text-emerald-500"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-slate-400 h-full transition-all",
                    isActive && "opacity-100",
                    isCompleted && " border-emerald-700 dark:text-emerald-500"
                )}
            />
        </button>
    )
}

export default CourseSidebarItem