import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId  } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        if (!data || typeof data !== 'object') {
            return new NextResponse("Invalid request body", { status: 400 });
        }

        const { selectedPlan: plan, values: userInfo } = data;
        if (!plan || !userInfo || typeof userInfo !== 'object') {
            return new NextResponse("Missing plan or user info", { status: 400 });
        }

        let user = await db.user.findUnique({ where: { id: userId } });

        const userData = {
            id: userId,
            role: plan === "Pro" ? "INSTRUCTOR" : plan === "Enterprise" ? "BUSINESSOWNER" : "STUDENT",
            coursesLimit: plan === "Pro" ? 200 : plan === "Enterprise" ? 500 : 5,
            subscriptionPlan: plan,
            ...userInfo,
        };

        if (!user) {
            user = await db.user.create({ data: userData });
        } else {
            user = await db.user.update({
                where: { id: userId },
                data: userData,
            });
        }



        return NextResponse.json(user);
    } catch (error) {
        console.error('[SUBSCRIPTION & USER CREATION] :', error);
        return new NextResponse(JSON.stringify({ error: 'An error occurred while processing your request' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

