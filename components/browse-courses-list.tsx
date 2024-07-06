
import { Category, Course } from "@prisma/client"
import BrowseCourseCard from "./browse-course-card";


type CourseWithProgressWithCategory = Course & {
    category : Category | null;
    chapters : { id : string }[];
}

interface BrowseCoursesListProps {
    items : CourseWithProgressWithCategory[];
}

const BrowseCoursesList = ({
    items,
} : BrowseCoursesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
            xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <BrowseCourseCard 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        chaptersLength={item.chapters.length}
                        category={item?.category?.name!}
                        price={item.price!}
                    />
                ))}
            </div>
            {items.length === 0  && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No course found
                </div>
            )}
        </div>
    )   
}

export default BrowseCoursesList