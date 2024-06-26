import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH (
    req : Request,
    { params } : { params : { courseId : string } },
) {
    try {
        const { userId } = auth();

            if (!userId){
                return new NextResponse("Unautorized", {status : 401});
            }
            const course = await db.course.findUnique({
                where : {
                    userId : userId,
                    id : params.courseId,
                }, include : {
                    chapters : {
                        include : {
                            muxData : true,
                        }
                    }
                }
            })

            if(!course) { 
                return new NextResponse("Not Found", {status : 404});
            }

            const hasPublishedCourse = course.chapters.some((chapter) => chapter.isPublished)

            if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedCourse){
                return new NextResponse("missing required fields", {status:401});
            }

            const publishedCourse = await db.course.update({
                where : {
                    id : params.courseId,
                    userId,
                },
                data :{
                    isPublished : true,
                }
            });

            return NextResponse.json(publishedCourse)
            
    } catch (error) {
        console.log("[COURSE_PUBLISH] ", error)
        return new NextResponse("internal Error", {status : 500})
    }
}