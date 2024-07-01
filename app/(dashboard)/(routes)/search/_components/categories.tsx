"use client"

import { Category } from "@prisma/client"
import {
    FcEngineering,
    FcFilmReel,
    FcMusic,
    FcSalesPerformance,
    FcSportsMode,
    FcOldTimeCamera,
    FcMultipleDevices,
    FcAdvertising,
    FcBiotech,
    FcRegisteredTrademark,
    FcWorkflow,
    FcBusiness,

} from "react-icons/fc"
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

interface CategoriesProps {
    items : Category[];
}

const iconMap : Record<Category["name"], IconType> = {
    "Music" :   FcMusic,
    "Computer Science" :   FcMultipleDevices,
    "Business" :   FcBusiness,
    "Fitness" :   FcSportsMode,
    "Accounting" : FcSalesPerformance,
    "Photography" : FcOldTimeCamera,
    "Filming" : FcFilmReel,
    "Marketing" : FcWorkflow,
    "Engineering" : FcEngineering,
}

const Categories = ({
    items,
}:CategoriesProps) => {


    return (
        <div className="flex items-center gap-x-2 pb-2 overflow-x-auto">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    value={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                />
            ))}
        </div>
    )
}

export default Categories