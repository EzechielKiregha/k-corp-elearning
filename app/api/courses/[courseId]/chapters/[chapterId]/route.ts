import Mux from '@mux/mux-node';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { video } = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'], // This is the default and can be omitted
    tokenSecret: process.env['MUX_TOKEN_SECRET'], // This is the default and can be omitted
});


export async function DELETE(
    req : Request,
    { params } : { params : { courseId : string, chapterId : string } }
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

            const chapter = await db.chapter.findUnique({
                where :{
                    id :  params.chapterId,
                    courseId : params.courseId,
                }
            });

            if (!chapter){
                return new NextResponse("Not Found", {status:404});
            }

            if (chapter.videoUrl){
                
                const existingNuxvideo = await db.muxData.findFirst({
                    where : {
                        chapterId : params.chapterId
                    },
                });

                if(existingNuxvideo){
                    await video.assets.delete(existingNuxvideo.assetId);
                    await db.muxData.delete({
                        where : {
                            id : existingNuxvideo.id,
                        }
                    });
                }
            }

            const deleteChapter = await db.chapter.delete({
                where : {
                    id : params.chapterId
                },
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

            return NextResponse.json(deleteChapter)

        } catch (error) {
            console.log("[DELETE_COURSE_CHAPTER] ",error)
            return new NextResponse("internal Error", {status : 500})
        }
    
}

export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string, chapterId : string } }
    ) {
        try {
            const { userId } = auth();

            if (!userId){
                return new NextResponse("Unautorized", {status : 401});
            }
            const {isPublished, ...values} = await req.json();

            const ownCourse = await db.course.findUnique({
                where : {
                    userId : userId,
                    id : params.courseId,
                }
            })

            if(!ownCourse) { 
                return new NextResponse("Unautorized", {status : 401});
            }

            const chapter = await db.chapter.update({
                where :{
                    id :  params.chapterId,
                    courseId : params.courseId,
                },
                data : {
                    ...values,
                }
            });
            if (values.videoUrl){
                const existingNuxvideo = await db.muxData.findFirst({
                    where : {
                        chapterId : params.chapterId
                    },
                });

                if(existingNuxvideo){
                    await video.assets.delete(existingNuxvideo.assetId);
                    await db.muxData.delete({
                        where : {
                            id : existingNuxvideo.id,
                        }
                    });
                }

                const asset = await video.assets.create({
                    input : values.videoUrl,
                    playback_policy: ["public"],
                    test : false,
                })

                await db.muxData.create({
                    data : {
                        chapterId : params.chapterId,
                        assetId : asset.id,
                        playbackId : asset.playback_ids?.[0]?.id,
                    }
                })
            }

            return NextResponse.json(chapter)
        } catch (error) {
            console.log("[COURSES_CHAPTER_ID] ", error);
            return new NextResponse("Internal error", { status : 500});
        }
}