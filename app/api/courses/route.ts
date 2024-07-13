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

            if(!userId ) {
                return new NextResponse("Unauthorized ", {status : 401})
            }

            const institution = await db.institution.findUnique({
                where : {
                    owner : userId,
                }
            })
            let course = null; 
            
            if (!institution){
                course = await db.course.create({
                    data: {
                        userId,
                        title,
                    }
                })
            }

            course = await db.course.create({
                data: {
                    userId,
                    title,
                    institutionId : institution?.id,
                }
            })

            return NextResponse.json(course)

        } catch (error) {
            console.log("[COURSES]", error)
            return new NextResponse("Internal Error", {status : 500})
        }
    
}