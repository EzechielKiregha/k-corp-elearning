import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    { params } : { params : { institutionId : string } }
    
    ) {

        try {
            const { userId } = auth();

            if(!userId){
                return new NextResponse("Unautorized", {status : 401})
            }
            const Institution = await db.institution.findUnique({
                where : {
                    id : params.institutionId,
                }
            })

            if(!Institution) { 
                return new NextResponse("Unautorized", {status : 401});
            }

            const institution = await db.institution.delete({
                where : {
                    id : params.institutionId,
                }
            })
            
            return NextResponse.json(institution)
        } catch (error) {
            console.log("[INSTITUION_ID] ", error);
            return new NextResponse("Internal error", {status : 500})
        }
}
export async function GET(
    req:Request,
    { params } : { params : { institutionId : string } }
    
    ) {
        try {
            const { userId } = auth();

            if(!userId){
                return new NextResponse("Unautorized", {status : 401})
            }
            const Institution = await db.institution.findUnique({
                where : {
                    id : params.institutionId,
                }
            })

            if(!Institution) { 
                return new NextResponse("Institution Not Found", {status : 404});
            }
            
            return NextResponse.json(Institution)
        } catch (error) {
            console.log("[INSTITUION_ID] ", error);
            return new NextResponse("Internal error", {status : 500})
        }
}
export async function PATCH(req: NextRequest,
    { params } : { params : { institutionId : string } }
    ) {
    try {
        const data = await req.json();
        if (!data || typeof data !== 'object') {
            return new NextResponse("Invalid request body", { status: 400 });
        }

        const { values: institutionInfo } = data;

        const Institution = await db.institution.findUnique({
            where : {
                id : params.institutionId,
            }
        })

        if(!Institution) { 
            return new NextResponse("Institution Not Found", {status : 404});
        }
        
        const institution = await db.institution.update({
            where : {
                id : params.institutionId,
            },
            data: {
                ...institutionInfo,
            },
        });

        return NextResponse.json(institution);
    } catch (error) {
        console.error("Institution creation error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}