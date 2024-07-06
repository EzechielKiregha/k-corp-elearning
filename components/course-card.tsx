import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import IconBadge from './icon-badge';
import { BookOpen } from 'lucide-react';
import formatPrice  from '@/lib/format'
import CourseProgress from './couurse-progress';


interface CourseCardProps {
    key : string;
    id : string;
    title : string;
    imageUrl : string;
    chaptersLength : number;
    category : string;
    price : number;
    progress : number | null;
}


const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    category,
    progress,
    price,
} : CourseCardProps) => {

    const formatedPrice = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency : "USD"
    }).format(price)

    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm h-full p-3 border rounded-lg overflow-hidden transition">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className='object-cover'
                        src={imageUrl}
                        alt={title}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen}/>
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <>
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress} />
                            {/* <p>the progress: {progress}</p> */}
                        </>
                    ) : (
                        <p>
                            {formatedPrice}
                        </p>
                        
                    )}
                    
                </div>
            </div>
        </Link>
    )
}

export default CourseCard