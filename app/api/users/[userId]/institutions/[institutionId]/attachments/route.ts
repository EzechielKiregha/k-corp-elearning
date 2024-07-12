import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { institutionId : string } }
    ) {
        try {
            const { userId } = auth();
            const { url } = await req.json()

            if (!userId){
                return new NextResponse("Unautorized", {status : 401});
            }

            const institution = await db.institution.findUnique({
                where : {
                    id : params.institutionId,
                }
            })

            if(!institution) { 
                return new NextResponse("Unautorized", {status : 401});
            }

            const attachments = await db.attachment.create({
                data : {
                    url,
                    name : url.split("/").pop(),
                    institutionId : params.institutionId!,
                }
            })
            return NextResponse.json(attachments)
        } catch (error) {
            console.log("[INSTITUTION_ID_ATTACHMENT] ", error);
            return new NextResponse("Internal error", { status : 500});
        }
}