import NavbarRoutes from '@/components/navbar-routes';
import { Course, Chapter, UserProgress } from '@prisma/client';
import React from 'react'
import CourseMobileNavbar from './course-mobile-sidebar';


interface CourseNavbarProps {
    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null;
        })[]
    };
    progressCount : number;
}

const CourseNavbar = ({
    course,
    progressCount,
}:CourseNavbarProps) => {
    return (
        <div className="flex items-center h-full p-4 border-b bg-white dark:bg-slate-900 shadow-sm">
            <CourseMobileNavbar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes/>
            
        </div>
    )
}

export default CourseNavbar