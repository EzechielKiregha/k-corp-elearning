import { CheckCircleIcon, AlertTriangle } from "lucide-react"
import { LucideIcon } from "lucide-react";
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from "@/lib/utils";
import { TypeOf, string } from "zod";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants : {
            variant : {
                warning : "bg-yellow-200/20 border-yellow-30 text-primary",
                success : "bg-emerald-700 border-emerald-800 text-secondary",
            },
            // size : {
            //     default : "p-2",
            //     sm : "p-1",
            // }
        },
        defaultVariants : {
            variant : "warning",
            // size : "default",
        }
    }
);



const iconMap = {
    warning : AlertTriangle,
    success : CheckCircleIcon, 
}

interface BannerProps extends VariantProps<typeof bannerVariants>
{
    label : string
};

const Banner = (
    {
        label,
        variant,
    } : BannerProps
) => {

    const Icon = iconMap[ variant || "warning" ]
    return(
    <div className={cn(bannerVariants({variant}))}>
        <Icon className="h-4 w-4 mr-2"/>
        {label}
    </div>)
}

export default Banner