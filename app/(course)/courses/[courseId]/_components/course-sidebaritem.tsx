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
                "flex items-center gap-x-2 text-sm text-slate-500 font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "hover:text-slate-700 hover:bg-slate-200/20 text-slate-700 ",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20"
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <Icon 
                    className={cn(
                        "text-slate-500",
                        isActive && " text-slate-700",
                        isCompleted && " text-emerald-700"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                    isActive && "opacity-100",
                    isCompleted && " border-emerald-700"
                )}
            />
        </button>
    )
}

export default CourseSidebarItem