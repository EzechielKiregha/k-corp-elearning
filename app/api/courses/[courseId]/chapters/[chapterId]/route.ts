import Mux from '@mux/mux-node';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from 'axios';

const { video } = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'], 
    tokenSecret: process.env['MUX_TOKEN_SECRET'],
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
                
                const existingMuxvideo = await db.muxData.findFirst({
                    where : {
                        chapterId : params.chapterId
                    },
                });

                if(existingMuxvideo){
                    await video.assets.delete(existingMuxvideo.assetId);
                    await db.muxData.delete({
                        where : {
                            id : existingMuxvideo.id,
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

async function handleMuxAssetCreation(chapterId: string, videoUrl: string) {
    try {
        const asset = await video.assets.create({
            input: [{ url: videoUrl }],
            playback_policy: ["public"],
            test: false,
        });

        await db.muxData.create({
            data: {
                chapterId: chapterId,
                assetId: asset.id,
                playbackId: asset.playback_ids?.[0]?.id,
            },
        });

        return asset;
    } catch (error) {
        console.error('Error creating Mux asset:', error);
        throw new Error('Error creating Mux asset');
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { isPublished, ...values } = await req.json();

        const ownCourse = await db.course.findUnique({
            where: {
                userId: userId,
                id: params.courseId,
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            }
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId
                },
            });

            if (existingMuxData) {
                // Check if the existing asset is still valid
                try {
                    const { data } = await axios.get(`/api/mux/asset?assetId=${existingMuxData.assetId}`);
                    
                    if (!data.exists) {
                        // If the asset doesn't exist, delete the MuxData entry and create a new asset
                        await db.muxData.delete({
                            where: {
                                id: existingMuxData.id,
                            }
                        });
                        await handleMuxAssetCreation(params.chapterId, values.videoUrl);
                    } else {
                        // If the asset exists but the URL has changed, delete the old asset and create a new one
                        await video.assets.delete(existingMuxData.assetId);
                        await db.muxData.delete({
                            where: {
                                id: existingMuxData.id,
                            }
                        });
                        await handleMuxAssetCreation(params.chapterId, values.videoUrl);
                    }
                } catch (error) {
                    console.error('Error checking Mux asset:', error);
                    // If there's an error checking the asset, assume it doesn't exist and create a new one
                    await db.muxData.delete({
                        where: {
                            id: existingMuxData.id,
                        }
                    });
                    await handleMuxAssetCreation(params.chapterId, values.videoUrl);
                }
            } else {
                // If no MuxData exists, create a new asset
                await handleMuxAssetCreation(params.chapterId, values.videoUrl);
            }
        }

        return NextResponse.json(chapter);
    } catch (error) {
        console.error("[COURSES_CHAPTER_ID] :");
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return new NextResponse("Internal error", { status: 500 });
    }
}
