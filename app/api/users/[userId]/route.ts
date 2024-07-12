import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

export async function GET(req : Request,
    {params} : {params : { userId : string }}
) {

    try {

        const { userId } = params;

        if (!userId) {
            return redirect('/')
        }

        const user = await db.user.findUnique({
            where : {
                id : userId,
            },
        })

        if (!user) {
            return new NextResponse("User Not Found", {status : 404});
        }

        return NextResponse.json(user)

    } catch (error) {
        console.log("[GET_USER] :", error)
        return new NextResponse("internal error ", {status : 500})
    }
}