import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client"
import { getProgress } from "./get-progress";


type CourseWithoutProgressWithCategory = Course & {
    category : Category | null;
    chapters : { id : string }[];
}

type GetBrowseCourses = {
    title? : string;
    categoryId? : string;
}

export const getBrowseCourses = async () : Promise<CourseWithoutProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where : {
                isPublished : true,
            },
            include : {
                category : true,
                chapters : {
                    where : {
                        isPublished : true,
                    },
                    select : {
                        id : true,
                    }
                },
            },
            orderBy : {
                createdAt : "desc"
            }
        });

        const courseWithoutProgress : CourseWithoutProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                return {
                    ...course,
                }
            })
        )
        return courseWithoutProgress;

    } catch (error) {
        console.log("[GET_BROWSE_COURSE] ",error)
        return []
    }
}