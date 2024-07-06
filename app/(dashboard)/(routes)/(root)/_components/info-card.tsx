import IconBadge from '@/components/icon-badge'
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface InfoCardProps {
    numberOfItems : number;
    variant?:"default" | "success";
    icon : LucideIcon;
    label : string;     
}


const InfoCard = (
    {
        label,
        icon : Icon,
        numberOfItems,
        variant,
    } : InfoCardProps
) => {
    return (
        <div className="flex border rounded-md items-center gap-x-2 p-3">
            <IconBadge
                variant={variant}
                icon={Icon}
            />
            <div>
                <p className="font-medium">
                    {label}
                </p>
                <p className="text-gray-500 text-sm">
                    {numberOfItems} {numberOfItems === 1 ? "course" : "courses"}
                </p>
            </div>
        </div>
    )
}

export default InfoCard