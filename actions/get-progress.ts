import { db } from "@/lib/db";

export const getProgress = async (
    userId : string,
    courseId : string,

) : Promise<number> => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where : {
                courseId : courseId,
                isPublished : true,
            }
        })

        const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
        const validCompletedChapter = await db.userProgress.count({
            where : {
                userId : userId,
                chapterId : {
                    in : publishedChaptersIds,
                },
                isCompleted : true
            }
        })

        const progressPercentage = (validCompletedChapter / publishedChaptersIds.length) * 100;
        console.log("Progress :", progressPercentage)
        return progressPercentage;
    } catch (error) {
        console.log("[GET_PROGRESS] ", error)
        return 0;
    }
}