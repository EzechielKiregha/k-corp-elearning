import { useUser } from "@/hooks/use-User";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/isTeacher";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(
    req : Request,
    
    ) {
        try {
            const { userId } = auth();
            const { title } = await req.json();
            const teacher = useUser(userId)

            if(!userId || !isTeacher(teacher!)) {
                return new NextResponse("Unauthorized ", {status : 401})
            }

            const course = await db.course.create({
                data: {
                    userId,
                    title,
                }
            })

            return NextResponse.json(course)

        } catch (error) {
            console.log("[COURSES]", error)
            return new NextResponse("Internal Error", {status : 500})
        }
    
}