import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT (
    req : Request,
    { params } : { params : { courseId : string, chapterId : string} },
) {
    try {
        const { userId } = auth();
        const { isCompleted } = await req.json();

        if (!userId){
            return new NextResponse("Unautorized", {status : 401});
        }
        const userProgress = await db.userProgress.upsert({
            where : {
                userId_chapterId : {
                    userId,
                    chapterId : params.chapterId,
                },
            },
            update : {
                isCompleted : isCompleted,
            },
            create : {
                userId,
                chapterId : params.chapterId,
                isCompleted,
            }
        })

        if(!userProgress) { 
            return new NextResponse("Unautorized", {status : 401});
        }

        const chapter = await db.chapter.findUnique({
            where :{
                id :  params.chapterId,
                courseId : params.courseId,
            }
        });

        if (!chapter){
            return new NextResponse("Not Found", {status:404});
        }

        const muxData = await db.muxData.findUnique({
            where : {
                chapterId : params.chapterId,
            }
        })

        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl){
            return new NextResponse("Missing required fields", {status:404});
        }

        const publishedChapter = await db.chapter.update({
            where : {
                id : params.chapterId,
                courseId : params.courseId,
            },
            data :{
                isPublished : true,
            }
        });
        return NextResponse.json(publishedChapter)
    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS] ", error)
        return new NextResponse("internal Error", {status : 500})
    }
}