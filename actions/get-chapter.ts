import { db } from '@/lib/db';
import { Attachment, Chapter } from '@prisma/client';
import { error } from 'console';
import React from 'react'
interface GetChapterProps {
    userId : string;
    courseId : string;
    chapterId : string;
}
const getChapter = async ({
    userId,
    courseId,
    chapterId
} : GetChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId,
                    courseId,
                }
            }
        })

        const course = await db.course.findUnique({
            where : {
                id : courseId,
                isPublished : true,
            }, select : {
                price : true,
            }
        })

        const chapter = await db.chapter.findUnique({
            where : {
                id : chapterId,
                isPublished : true,
            }
        })

        if (!chapter){
            throw new Error("Chapter or course not found.")
        }

        let muxData = null
        let attachments : Attachment[] = []
        let nextChapter : Chapter | null

        if(purchase){
            attachments = await db.attachment.findMany({
                where : {
                    courseId : courseId,
                }
            })
        }

        if(chapter.isFree || purchase){
            muxData = await db.muxData.findUnique({
                where : { 
                    chapterId : chapterId,
                }
            })
    
            nextChapter = await db.chapter.findFirst({
                where : {
                    courseId : courseId,
                    isPublished : true,
                    position : {
                        gt : chapter?.position,
                    }
                }, orderBy : {
                    position : "asc"
                }
            })
        }
        const userProgress = await db.userProgress.findUnique({
            where : {
                userId_chapterId : {
                    userId,
                    chapterId,
                }
            }
        });

        return {
            chapter,
            course,
            muxData,
            userProgress,
            nextChapter,
            attachments,
            purchase,
        };

    } catch (error) {
        console.log("[GET_CHAPTER] ", error)
        return {
            chapter : null,
            course : null,
            muxData : null,
            attachments : [],
            nextChapter : null,
            purchase : null,
            userProgress : null,
        }
            
            
    }

  
}

export default getChapter