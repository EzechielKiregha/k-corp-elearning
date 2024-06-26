import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'], // This is the default and can be omitted
    tokenSecret: process.env['MUX_TOKEN_SECRET'], // This is the default and can be omitted
});

export async function DELETE(
    req : Request,
    { params } : { params : { courseId : string } }
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
                return new NextResponse("Unautorized", {status : 401});
            }

            for (const chapter of course.chapters){
                if (chapter.muxData?.assetId){
                    await video.assets.delete(chapter.muxData.assetId);
                }
            }

            const deletedCourse = await db.course.delete({
                where : {
                    id : params.courseId
                }
            });

            return NextResponse.json(deletedCourse)

        } catch (error) {
            console.log("[DELETE_COURSE_CHAPTER] ",error)
            return new NextResponse("internal Error", {status : 500})
        }
    
}

export async function PATCH(
    req:Request,
    { params }: {params : {courseId : string }}
    ) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json()

        if(!userId) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        const course = await db.course.update({
            where : {
                id : courseId,
                userId
            },
            data : {
                ...values,
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log("[COURSE_ID] :", error);
        return new NextResponse("Internal error",  { status : 500 });
    }
    
}