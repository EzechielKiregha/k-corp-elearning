"use client";

import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useUser } from '@/hooks/use-User';
import InstitutionsForm from '../_components/inst-form';
import { useBusiness } from '@/hooks/use-Business';
import { CircleArrowRight } from 'lucide-react';
import InstitutionForNewUserForm from "@/app/(guest)/subscription/_forms/inst-form";
import NewUserForm from "@/app/(guest)/subscription/_forms/user-form";
import Banner from "@/components/banner";
import UserIdPage from "./[userId]/page";
import SubscriptionButton from "../_components/subscrption-button";

const formSchema = z.object({
    name : z.string().min(1, {
        message : "name is required"
    })
})

const CreateInstitution = () => {

    const router = useRouter()
    const {userId} = useAuth()

    const user = useUser(userId);
    const institution = useBusiness(user?.institutionId, userId)
    const [gotBusiness, setGotbusiness] = useState(false)
    const [gotPro, setGotPro] = useState(false)
    const [enterpriseisActivated, setEnterpriseIsActivated] = useState(false)
    const [proIsActivated, setProIsActivated] = useState(false)
    const [freeIsActivated, setFreeIsActivated] = useState(false)
    
    useEffect(()=>{
        try {
            if (institution ){
                if (user?.subscriptionPlan === "Enterprise") setGotbusiness(true);
                if (institution.isActivated && user?.subscriptionPlan === "Ultimate Enterprise Plan") {
                    setEnterpriseIsActivated(true) ;
                    setGotbusiness(true);
                }
            } else if (user?.subscriptionPlan === "Pro") {
                setGotPro(true);
                setGotbusiness(false)
            } else if (user?.subscriptionPlan === "Ultimate Enterprise Plan") {
                setProIsActivated(true)
            }
            else {
                if (user?.subscriptionPlan === "Student Free MemberShip") {
                    setFreeIsActivated(true)
                    setGotPro(false);
                } else {
                    setGotPro(true);
                }
                setGotbusiness(false)
            }
        } catch (error) {
            console.log("Error fetching the user business: ",error)
        }
    },[userId, user])

    
    return (
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center p-4">
            <UserButton/>
            <NewUserForm initialData={user!} selectedPlan={user?.subscriptionPlan!}/>
            {!gotBusiness ? (
                <>
                
                <div className="flex items-center justify-center">
                    {gotPro ? (
                        <>
                        {proIsActivated ? (
                            <>
                            <Banner
                                variant="success"
                                label="You are a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses"
                            />
                            <UserIdPage /></>
                        ) : (
                            <>
                            <Banner
                                variant="warning"
                                label="You are a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses"
                            />
                            <Button variant="link">
                                <CircleArrowRight />
                                Upgrade to Enterprise. Register You Institution, University, College, ... and Manage your students, and Create up to [ 500 ] courses.
                            </Button>
                            <SubscriptionButton userId={userId!} price={11.99} />
                            <UserIdPage /></>
                        )}
                        </>
                    ): (
                        <>
                        {freeIsActivated ? (
                            <>
                            <Banner
                                variant="success"
                                label="You are a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses" 
                                />
                            <UserIdPage /></>
                        ) : (
                            <><Banner
                            variant="warning"
                            label="By activating your account you will the Student Free MemberShip. Create up to [ 5+ ] courses & start teaching your collegues" />
                            <Button variant="link">
                                <CircleArrowRight />
                                Activate & get Student Free MemberShip.
                            </Button>
                            <SubscriptionButton userId={userId!} price={0.00} />
                            <UserIdPage />
                            </>
                        )}
                        <Button variant="link">
                            <CircleArrowRight />
                            Upgrade to Pro .become a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses.
                        </Button>
                        <Link href="/subscription">
                            <Button variant="link">
                                <CircleArrowRight />
                                Upgrade to Enterprise. Register 
                            </Button>
                        </Link>
                        <UserIdPage />
                        </>
                    )}
                </div>
                
                </>
            ):(
                <><Banner
                    variant="success"
                    label="You are an Institution, University, College, ..." />
                {enterpriseisActivated ? (
                    <><Banner
                    variant="success"
                    label="You are an Institution, University, College, ... and Manage your students, and Create up to [ 500 ] courses." />
                    <Link href={`/profile/user/${userId}/institutions/${institution?.id}`}>
                        <Button variant="ghost">
                            <CircleArrowRight />
                            Visite '{institution?.name}'
                        </Button>
                    </Link></>
                ) : (
                    <><Button variant="link">
                        <CircleArrowRight />
                        Activate Your Institution. Advanced Analytics & Full Management of Courses and students, Create up to [ 500+ ] courses.
                    </Button>
                    <SubscriptionButton userId={userId!} price={68.99} /></>
                )}
                </>
            )} 
        </div>
        
    )
    
}

export default CreateInstitution