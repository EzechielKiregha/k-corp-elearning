import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req : Request,
    {params} : {params : { userId : string }}
) {

    try {

        const userId  = params.userId;

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

export async function PATCH(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        
        if (!data || typeof data !== 'object') {
            return new NextResponse("Invalid request body", { status: 400 });
        }

        const user = await db.user.update({
            where: { id: userId },
            data: {
                ...data,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('[UPDATE USER] :', error);
        return new NextResponse(JSON.stringify({ error: 'An error occurred while updating user data'}), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

