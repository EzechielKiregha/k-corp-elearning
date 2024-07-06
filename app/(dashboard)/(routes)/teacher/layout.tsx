import { isTeacher } from '@/lib/isTeacher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const TeacherLayout = ({
    children
} : {
    children : React.ReactNode;
}) => {

    const {userId } = auth();

    if (!isTeacher(userId)){
        return redirect("/")
    }

    return <> {children} </>

}

export default TeacherLayout