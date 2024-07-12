import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    { params } : { params : { institutionId : string , attachmentId : string } }
    
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

            const attachments = await db.attachment.delete({
                where : {
                    id : params.attachmentId,
                    institutionId : params.institutionId,
                }
            })
            
            return NextResponse.json(attachments)
        } catch (error) {
            console.log("[ATTACHMENT_ID] ", error);
            return new NextResponse("Internal error", {status : 500})
        }
    
}