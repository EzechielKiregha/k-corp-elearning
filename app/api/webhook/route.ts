import Stripe from "stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(
    req : Request
) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event : Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error : any) {
        return new NextResponse(`Webhook Error: ${error.message}`, {status: 400});
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId
    const sub = session?.metadata?.subscriptionId

    if(event.type === "checkout.session.completed"){
        if (!courseId || !sub){
            console.log("[ webhool stripe ] Either Course ID or Subscription Gone missing.")
        }

        if(userId && courseId) {
            await db.purchase.create({
                data : {
                    userId : userId,
                    courseId : courseId,
                }
            })
        }else if (userId && sub && (!sub.includes('Pro_Membership_') || !sub?.includes('StudentFreeOffer_'))){
            await db.institution.update({
                where : {
                    id : sub,
                },
                data : {
                    isActivated : true,
                }
            })
        } else {
            await db.user.update({
                where : {
                    id : userId,
                },
                data : {
                    subscriptionPlan : sub?.includes('Pro_Membership_') ? "Pro MemberShip" : sub?.includes('Student_Free_Membership_') ?
                    "Student Free MemberShip" : "Ultimate Enterprise Plan"
                }
            })
        }

    } else {
        return new NextResponse(`Webhook Error : Unhandeled event type ${event.type}`, {status : 200})
    }

    return new NextResponse(null, {status : 200})

}