"use client"
import { useUser } from '@/hooks/use-User';
import { isTeacher } from '@/lib/isTeacher';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const TeacherLayout = ({
    children
} : {
    children : React.ReactNode;
}) => {

    const { userId } = useAuth();

    const user = useUser(userId)

    if (user && (isTeacher(user) === false)){
        console.log("this nigga ain't Teacher or Instructor")
        return redirect("/dashboard")
    }

    return <> {children} </>

}

export default TeacherLayout