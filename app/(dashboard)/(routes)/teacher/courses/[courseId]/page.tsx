import React from 'react'

const CourseId = ({
    params
} : {
    params : { courseId: string }
}) => {
    return (
        <div>Course Id : {params.courseId}</div>
    )
}

export default CourseId