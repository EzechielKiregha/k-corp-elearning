import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH (
    req : Request,
    { params } : { params : { courseId : string, chapterId : string} },
) {
    try {
        const { userId } = auth();

            if (!userId){
                return new NextResponse("Unautorized", {status : 401});
            }
            const ownCourse = await db.course.findUnique({
                where : {
                    userId : userId,
                    id : params.courseId,
                }
            })

            if(!ownCourse) { 
                return new NextResponse("Unautorized", {status : 401});
            }

            const unpublishedChapter = await db.chapter.update({
                where : {
                    id : params.chapterId,
                    courseId : params.courseId,
                },
                data :{
                    isPublished : false,
                }
            });

            const publishedChaptersInCourse = await db.chapter.findMany({
                where : {
                    courseId : params.courseId,
                    isPublished : true
                }
            })
            
            if(!publishedChaptersInCourse.length) {
                await db.course.update({
                    where : {
                        id : params.courseId,
                    },
                    data : {
                        isPublished : false,
                    }
                });
            }

            return NextResponse.json(unpublishedChapter)
    } catch (error) {
        console.log("[CHAPTER_PUBLISH] ", error)
        return new NextResponse("internal Error", {status : 500})
    }
}