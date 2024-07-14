"use client";

import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useUser } from '@/hooks/use-User';
import { useBusiness } from '@/hooks/use-Business';
import { CircleArrowRight, Loader2 } from 'lucide-react';
import Banner from "@/components/banner";
import SubscriptionButton from "../_components/subscrption-button";
import { useNavigation } from "@/hooks/useNavigation";
import UserIdPage from "./_components/user-id-page";
import InstitutionProfile from "../_components/inst-form";
import UserPaymentStatusHandler from "./_components/UserActivationStatus";
import { useRouter } from "next/navigation";


const Profile = () => {

    const {userId} = useAuth()

    const user = useUser(userId);
    
    const { institution, isLoading, error } = useBusiness(user?.institutionId, userId);

    const [gotBusiness, setGotbusiness] = useState(false)
    const [gotPro, setGotPro] = useState(false)
    const [enterpriseisActivated, setEnterpriseIsActivated] = useState(false)
    const [proIsActivated, setProIsActivated] = useState(false)
    const [freeIsActivated, setFreeIsActivated] = useState(false)
    const nav = useNavigation()
    const router = useRouter();

    useEffect(()=>{
        try {
            if (user?.role === "BUSINESSOWNER") setGotbusiness(true);

            if (institution?.isActivated) {
                router.refresh()
                setEnterpriseIsActivated(true) ;
                setGotbusiness(true);
                setGotPro(false)
            }
            
            if (user?.subscriptionPlan === "Pro") {
                setGotPro(true);
                setGotbusiness(false)
            } else if (user?.subscriptionPlan === "Pro MemberShip") {
                setProIsActivated(true);
                setGotPro(false)
                setGotbusiness(false)
            }
            
            if (user?.subscriptionPlan === "Free") {
                setFreeIsActivated(true)
            } else if (user?.subscriptionPlan === "Student Free MemberShip") {
                setFreeIsActivated(true)
                setGotPro(false);
            }
            
            router.refresh()
        } catch (error) {
            console.log("Error fetching the user business: ",error)
        }
    },[userId, user])

    if (!userId) nav('/')

    return (
        <div className="flex justify-center items-center flex-col">
            <UserPaymentStatusHandler userId={userId!} institutionId={institution?.id!} />
            {error && <div>Error: {error}</div>}
            {!gotBusiness ? (
                <>
                <div className="flex justify-center items-center flex-col" >
                    {gotPro ? (
                        <>
                        {proIsActivated ? (
                            <>
                            <Banner
                                variant="success"
                                label="You are a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses"
                            />
                            <Button onClick={() => nav('/subscription')} variant="link">
                                <CircleArrowRight />
                                Upgrade to Enterprise & Unlock [ 500+ ] courses. 
                            </Button>
                            <UserIdPage userId={userId!} user={user!}/>
                            </>
                        ) : (
                            <>
                            <Banner
                                variant="success"
                                label="You are a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses"
                            />
                            <Button onClick={() => nav('/subscription')} variant="link">
                                <CircleArrowRight />
                                Upgrade to Enterprise. [ 500+ ] courses.
                            </Button>
                            <SubscriptionButton userId={userId!} price={11.99} />
                            <UserIdPage userId={userId!} user={user!}/>
                            </>
                        )}
                        </>
                    ): (
                        <>
                        {freeIsActivated && (
                            <>
                            <Banner
                                variant="success"
                                label="You are a Student Now With Instructor/Teacher Privileges at K-Corp eLearning. You Can Create up to [ 5+ ] courses" 
                                />
                            <Button onClick={() => nav('/subscription')} variant="link">
                                <CircleArrowRight />
                                Pro Member and Instructor at K-Corp eLearning. [ 200+ ] courses.
                            </Button>
                            <Button onClick={() => nav('/subscription')} variant="link">
                                <CircleArrowRight />
                                Register Your Business In Few Steps 
                            </Button>

                            <UserIdPage userId={userId!} user={user!}/>
                            </>
                        ) }
                        {!freeIsActivated && !proIsActivated && !enterpriseisActivated && (
                            <>
                            <Banner
                                variant="warning"
                                label="By activating your account you will the Student Free MemberShip. Create up to [ 5+ ] courses & start teaching your collegues" />
                            <br />
                            <SubscriptionButton userId={userId!} price={0.00} />

                            <Button onClick={() => nav('/subscription')} variant="link">
                                <CircleArrowRight />
                                Upgrade to Pro .become a Pro Member and Instructor at K-Corp eLearning. Create up to [ 200 ] courses.
                            </Button>
                            <Button onClick={() => nav('/subscription')} variant="link">
                                <CircleArrowRight />
                                Upgrade to the Ultimate Enterprise Plan. Register Your Business In Few Steps 
                            </Button>
                            <UserIdPage userId={userId!} user={user!}/>
                            </>
                            
                        )}
                        
                        </>
                    )}
                </div>
                
                </>
            ) : (
                <>
                {institution?.isActivated ? (
                    <><Banner
                        variant="success"
                        label="You are an Institution, University, College, ... and Manage your students, and Create up to [ 500 ] courses." />
                        <Button onClick={() => nav(`/profile/user/institutions/${institution?.id}`)} 
                            variant="ghost">
                            <CircleArrowRight />
                            Visite &apos; {institution?.name} &apos;
                    </Button>
                    <UserIdPage userId={userId!} user={user!}/>
                    </>
                ) : (
                    <>
                    <Banner
                        variant="success"
                        label="As Institution, University, College, ... know that by Activate Your Institution Status you unlock - Advanced Analytics & Full Management of Courses and students - you can Create up to [ 500+ ] courses."
                    /> <br />
                    <SubscriptionButton userId={userId!} price={68.99} />
                    <UserIdPage userId={userId!} user={user!}/>
                    <InstitutionProfile initialData={institution} userId={userId!}/>
                    </>
                )}
                </>
            )} 
        </div>
        
    )
    
}

export default Profile