import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const {userId} = auth();
        const data = await req.json();
        if (!data || typeof data !== 'object') {
            return new NextResponse("Invalid request body", { status: 400 });
        }

        const { values: institutionInfo } = data;
        
        if ( !institutionInfo || typeof institutionInfo !== 'object') {
            return new NextResponse("Missing plan or user info", { status: 400 });
        }

        const institution = await db.institution.create({
            data: {
                owner : userId,
                ...institutionInfo,
            },
        });

        await db.user.update({
            where : {
                id : userId!,
            }, data : {
                institutionId : institution.id
            }
        })

        return NextResponse.json(institution);
    } catch (error) {
        console.error("Institution creation error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

