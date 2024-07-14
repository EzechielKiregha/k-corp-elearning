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

        let price = userSub?.role === "INSTRUCTOR" ? 11.99 :
                        userSub?.role === "BUSINESSOWNER" ? 68.99 : 0.00

        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity : 1,
                price_data : {
                    currency : "USD",
                    product_data : {
                        name : userSub?.firstName +""+ userSub?.lastName,
                        description : price === 11.99 ? "The Pro Membership [200+ Courses creation] - " :
                        price === 68.99 ? "The Ultimate Enterprise Plan [500+ Courses creation] - " :
                        "Student Free Membership [5+ Courses creation] - ",
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
            success_url : userSub?.role === "BUSINESSOWNER" ? `${process.env.NEXT_PUBLIC_API_URL}/profile/user/institutions/${userSub!.institutionId}?success=1` : 
            `${process.env.NEXT_PUBLIC_API_URL}/profile/user/?success=2`,
            cancel_url : userSub?.role === "BUSINESSOWNER" ? `${process.env.NEXT_PUBLIC_API_URL}/profile/user/institutions/${userSub!.institutionId}?canceled=1` : 
            `${process.env.NEXT_PUBLIC_API_URL}/profile/user/?canceled=2`,
            metadata : {
                userId : user.id,
                subscriptionId : userSub?.subscriptionPlan === "Pro" ? `Pro_Membership_${userSub!.id}` :
                userSub?.subscriptionPlan === "Enterprise" ? `Ultimate_Enterpeise_Plan_${userSub!.institutionId}` : `Student_Free_Membership_${userSub!.id}`
            }
        });
        // console.log("Session URL : ", session.url );
        return NextResponse.json({url : session.url })
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT] ", error)
        return new NextResponse("Enternal Error", {status : 500})
    }
}