import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(
    req:Request,
    {params} : {params : { courseId : string}}
    ) {
    try {
        const user  = await currentUser()

        if(!user || !user.id || !user.emailAddresses?.[0]?.emailAddress){
            return new NextResponse("Unauthorized", {status : 401})
        }

        const userSub = await db.user.findUnique({
            where : {
                id : user.id
            }
        })

        let price = userSub?.subscriptionPlan === "Pro" ? 11.99 :
                        userSub?.subscriptionPlan === "Enterprise" ? 68.99 : 0.00

        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity : 1,
                price_data : {
                    currency : "USD",
                    product_data : {
                        name : userSub?.firstName +""+ userSub?.lastName,
                        description : userSub?.subscriptionPlan === "Pro" ? "The Pro Membership [200+ Courses creation] - " :
                        userSub?.subscriptionPlan === "Enterprise" ? "The Ultimate Enterprise Plan [500+ Courses creation] - " :
                        "StudentFreeOffer [5+ Courses creation] - ",
                    },
                    unit_amount : Math.round(price! * 100),
                }
            }
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where : {
                userId : user.id,
            }, select : {
                striperCustomerId : true,
            }
        })

        if(!stripeCustomer) {
            const customer = await stripe.customers.create({
                email : user.emailAddresses[0].emailAddress
            })

            stripeCustomer = await db.stripeCustomer.create({
                data : {
                    userId : user.id,
                    striperCustomerId : customer.id,
                }
            });
        }

        const session = await stripe.checkout.sessions.create({
            customer : stripeCustomer.striperCustomerId,
            line_items,
            mode : 'payment',
            success_url : `${process.env.NEXT_PUBLIC_API_URL}/users/${userSub!.id}?success=1`,
            cancel_url : `${process.env.NEXT_PUBLIC_API_URL}/users/${userSub!.id}?canceled=1`,
            metadata : {
                userId : user.id,
                subscriptionId : userSub?.subscriptionPlan === "Pro" ? `Pro_Membership_${userSub!.id}` :
                userSub?.subscriptionPlan === "Enterprise" ? `Ultimate_Enterpeise_Plan_${userSub!.institutionId}` : `StudentFreeOffer_${userSub!.id}`
            }
        });
        // console.log("Session URL : ", session.url );
        return NextResponse.json({url : session.url })
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT] ", error)
        return new NextResponse("Enternal Error", {status : 500})
    }
}