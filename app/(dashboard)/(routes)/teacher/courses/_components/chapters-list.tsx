"use cllient";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable
} from '@hello-pangea/dnd'
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface ChaptersListProps {
    items : Chapter[];
    onReorder : (updateDate : { id : string, position : number}[]) => void;
    onEdit : (id : string) => void;
}

export const ChaptersList = ({
    items,
    onReorder,
    onEdit,
}: ChaptersListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items)
    }, [items])

    const onDragEnd = (result : DropResult) => {
        if(!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updateChapters = items.slice(startIndex, endIndex + 1)

        setChapters(items);

        const bulkUpdateData = updateChapters.map((chapter) => ({
            id : chapter.id,
            position : items.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(bulkUpdateData);
    }

    if(!isMounted){
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable 
                                key={index}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div className={ cn(
                                        "flex items-center bg-slate-200 gap-x-2 border border-slate-200 rounded-md text-slate-700 mb-4 text-sm",
                                        chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                    ) }
                                    ref = {provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div className={ cn(
                                            "px-2 py=3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                            chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                        )}
                                        
                                        {...provided.dragHandleProps}
                                        >
                                            <Grip className="h-5 w-5"/>
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>
                                                    Free
                                                </Badge>
                                            )}
                                            <Badge 
                                            className={cn(
                                                "bg-slate-500",
                                                chapter.isPublished && 'bg-sky-700'
                                            )}
                                            >
                                                {chapter.isPublished ? "published" : "draft"}
                                            </Badge>
                                            <Pencil
                                            onClick={() => onEdit(chapter.id)}
                                            className="w-4 h4 cursor-pointer transition hover:opacity-75"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}