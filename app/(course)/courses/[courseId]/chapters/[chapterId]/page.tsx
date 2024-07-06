import getChapter from '@/actions/get-chapter';
import Banner from '@/components/banner';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import VideoPlayer from './_components/video-player';
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import Preview from '@/components/preview';
import { File } from 'lucide-react';
import CourseProgressButton from './_components/course-progress-button';

const ChapterIdPage = async ({
    params,
} : {params : { courseId : string, chapterId : string}}) => {

    const {userId} = auth();

    if(!userId) {
        return redirect('/')
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        purchase,
        nextChapter,
        userProgress,
    } = await getChapter({
        userId,
        chapterId : params.chapterId,
        courseId : params.courseId,
    })

    if (!chapter || !course){
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label='You already Completed this chapter'
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label='You need to purchase this course to watch this chapter.'
                />
            )}
            <div className="flex flex-col pb-20 max-w-4xl mx-auto">
                <div className="p-4">
                    <VideoPlayer 
                        chapterId={params.chapterId}
                        courseId={params.courseId}
                        title={chapter.title}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>

                <div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-2">
                        {chapter.title}
                    </h2>
                    {purchase ? (
                        <CourseProgressButton
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            nextChapterId={nextChapter?.id}
                            isCompleted={!!userProgress?.isCompleted}
                        />
                    ) : (
                        <CourseEnrollButton
                            courseId={params.courseId}
                            price={course.price!}
                        />
                    )}
                </div>
                
                <Separator/>
                <div>
                    <Preview 
                    value={chapter.description!}/>
                </div>
                {!!attachments.length && (
                    <>
                        <Separator/>
                        <div className="p-4">
                            {attachments.map((attachment) => (
                                <a 
                                key={attachment.id}
                                href={attachment.url}
                                target='_blank'
                                className='flex items-cente p-3 bg-sky-200 w-full
                                rounded-md hover:underline border text-sky-700'
                                >
                                    <File/>
                                    <p className="line-clamp-1">
                                        {attachment.name}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
            </div>
        </div>
    )
}

export default ChapterIdPage