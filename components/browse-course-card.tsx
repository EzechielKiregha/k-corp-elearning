import Image from 'next/image';
import IconBadge from './icon-badge';
import { BookOpen, User } from 'lucide-react';
import TGlink from './CustomLink';
import { db } from '@/lib/db';
import { Institution } from '@prisma/client';

interface CourseOwner {
    username: string;
    imageUrl: string | null;
    institution: Institution | null;
}
interface BrowseCourseCardProps {
    key : string;
    id : string;
    title : string;
    imageUrl : string;
    chaptersLength : number;
    category : string;
    price : number;
}

async function getCourseOwner(courseId: string): Promise<CourseOwner | null> {
    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
        select: {
            courseOwner: {
                select: {
                    username: true,
                    imageUrl: true,
                    institution: true,
                }
            }
        }
    });

    return course?.courseOwner || null;
}

const BrowseCourseCard = async ({
    id,
    title,
    imageUrl,
    chaptersLength,
    category,
    price,
} : BrowseCourseCardProps) => {

    const owner = await getCourseOwner(id);

    const formatedPrice = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency : "USD"
    }).format(price)

    return (
        <TGlink href={`/courses/${id}`}>
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
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <IconBadge size="sm" icon={BookOpen}/>
                        <span>
                            {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
                        </span>
                    </div>
                    
                        <p>
                            {formatedPrice}
                        </p>
                    <div className="flex items-start mt-4">
                        
                        {!owner?.imageUrl ? (
                            <IconBadge icon={User}/>
                        ) : (
                            <Image 
                                src={owner?.imageUrl!} 
                                alt={owner?.username!}
                                width={48}
                                height={48} 
                                className="w-12 h-12 mr-3 rounded-full border border-slate-300"
                            />
                        )}
                        
                        <div>
                            <h5>{owner?.username}</h5>
                            <span className="text-sm font-normal italic text-slate-400">
                                {owner?.institution?.name! || 'Sole Dev'}
                            </span>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </TGlink>
    )
}

export default BrowseCourseCard