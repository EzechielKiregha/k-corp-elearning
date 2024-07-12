"use client";

import { Institution } from "@prisma/client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InstitutionsListProps {
    items: Institution[];
    onEdit: (id: string) => void;
}

export const InstitutionsList = ({
    items,
    onEdit,
}: InstitutionsListProps) => {
    return (
        <div>
            {items.map((institution) => (
                <div key={institution.id} className={cn(
                    "flex items-center bg-slate-200 gap-x-2 border border-slate-200 rounded-md text-slate-700 mb-4 text-sm",
                    institution.isActivated && "bg-sky-100 border-sky-200 text-sky-700"
                )}>
                    <div className="px-2 py-3 flex-grow">
                        {institution.name}
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                        <Badge className={cn(
                            "bg-slate-500",
                            institution.isActivated && 'bg-sky-700'
                        )}>
                            {institution.isActivated ? "Active" : "Inactive"}
                        </Badge>
                        <Pencil
                            onClick={() => onEdit(institution.id)}
                            className="w-4 h-4 cursor-pointer transition hover:opacity-75"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}