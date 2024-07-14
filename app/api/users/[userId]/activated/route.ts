import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req : NextRequest) {

    try {
        const {userId} = auth()

        const user  = await db.user.findUnique({
            where : {
                id : userId!,
            }
        })

        const {success : success, institutionId : institutionId} = await req.json();
        if (success === '1') {
            if (user && userId){
                await db.institution.update({
                    where : {
                        id : institutionId!,
                    },
                    data : {
                        isActivated : true,
                    }
                })
                await db.user.update({
                    where : {
                        id : userId!,
                        institutionId : institutionId
                    },
                    data : {
                        subscriptionPlan :  "Ultimate MemberShip Plan"
                    }
                })
            }else{
                return new NextResponse("[FAILED ACTIVATION] ", {status : 400})
            }
        } else {
            if (user && userId){

                await db.user.update({
                    where : {
                        id : userId!,
                    },
                    data : {
                        subscriptionPlan : user?.subscriptionPlan === 'Pro' ? "Pro Membership" : "Student Free MemberShip"
                    }
                })

            } else {
                return new NextResponse("[FAILED ACTIVATION] ", {status : 400})
            }
        }
        return new NextResponse("[SUCCESS ACTIVATION] ", {status : 200})
    } catch (error) {
        console.log('[ACTIVATE_INSTITUTION_ID] ',error)
        return new NextResponse("Internal Server Error", {status : 500})
    }
    
}