"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"
import qs  from "query-string"

interface CategoryItemProps {
    label : string,
    value? : string,
    icon : IconType
}
const CategoryItem = ({
    label,
    value,
    icon : Icon,
}:CategoryItemProps) => {

    const pathNane = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url : pathNane,
            query : {
                title : currentTitle,
                categoryId : isSelected ? null : value
            }
        },{skipNull:true, skipEmptyString:true});

        router.push(url);
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-2 gap-x-1 border border-slate-200 rounded-full hover:border-sky-700 transition flex itens-center",
                isSelected && "bg-sky-200/20 border-sky-700 text-sky-800"
            )}
            type="button"
        >
            {Icon && <Icon size={20}/>}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}

export default CategoryItem