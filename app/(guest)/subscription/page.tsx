"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { redirect, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import MainNavbar from '../_components/MainNavbar';
import { pricingOptions } from '../constants';
import Footer from '../_components/Footer';
import NewUserForm from './_forms/user-form';
import InstitutionForNewUserForm from './_forms/inst-form';
import { useUser } from '@/hooks/use-User';
import { useBusiness } from '@/hooks/use-Business';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';

const SubscriptionPage = () => {

    const searchParams = useSearchParams()
    const nav = useNavigation()

    const { isLoaded, userId } = useAuth();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showInstitutionForm, setShowInstitutionForm] = useState(false);
    const user = useUser(userId);
    
    const { institution, isLoading, error } = useBusiness(user?.institutionId, userId);
    
    useEffect(() => {
        if (user && user.subscriptionPlan) {
            setCurrentPlan(user.subscriptionPlan)
        }

        if (currentPlan?.includes("Enterprise") ) {
            setShowUserForm(true)
            setShowInstitutionForm(true)
        }
        else if(!currentPlan?.includes("Enterprise") && !currentPlan?.includes("Plan")) {
            setShowInstitutionForm(false);
        }
        else if(!currentPlan?.includes("Pro") && !selectedPlan) {
            setShowUserForm(false);
        }
    }, [ user, userId]);

    if (!userId) return redirect("/sign-in")

    const resetPlan = () =>{
        setSelectedPlan(null)
        if(!currentPlan?.includes("Enterprise") || !currentPlan?.includes("Ultimate")  ) setShowInstitutionForm(false);
        if(!currentPlan?.includes("Pro") && !selectedPlan) setShowUserForm(false);
    }
    
    const handlePlanSelect = (plan: string) => {
        if (plan === "Enterprise" || plan.includes("Ultimate")) {
            setShowInstitutionForm(true);
        } else {
            setShowInstitutionForm(false);
        }
        setSelectedPlan(plan);
        setShowUserForm(true);
    };

    return (
        <>
        <MainNavbar />
        <div id='pricing' className='flex flex-col items-center justify-center mx-4'>
            {!currentPlan?.includes(selectedPlan!) && !selectedPlan && currentPlan &&(
                <>
                    <div className="flex flex-col items-center justify-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center my-8 tracking-wide">
                            Your Current Plan:
                        </h2>
                        <span className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-emerald-900 to-emerald-600 text-slate-200 p-4 rounded-lg">
                            {currentPlan}
                        </span>
                        <p className="text-xl sm:text-2xl mt-4">
                            {(currentPlan.includes("Pro")) ? "[200+ Courses creation]" :
                            currentPlan.includes("Enterprise") ? "[500+ Courses creation]" :
                            "[5+ Courses creation]"}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {pricingOptions.map((option) => (
                            <div key={option.title} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md">
                                <div className={`flex flex-col justify-between p-8 h-full rounded-xl ${
                                    currentPlan?.includes(option.title)
                                        ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-slate-100' 
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                                }`}>
                                    <div>
                                        <p className="text-3xl mb-4">{option.title}</p>
                                        <p className="mb-6">
                                            <span className="text-4xl mr-2">{option.price}</span>
                                            <span className="text-slate-400 tracking-tight">/month</span>
                                        </p>
                                        <ul className="space-y-3">
                                            {option.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <CheckCircle2 className="flex-shrink-0 w-6 h-6 mr-2" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {!currentPlan?.includes(option.title) && (
                                        <button
                                            onClick={() => (
                                                handlePlanSelect(option.title)
                                                // nav("/subscription")
                                            )}
                                            className="w-full mt-8 p-3 text-lg font-medium rounded-lg transition duration-200
                                                bg-slate-800 text-slate-100 hover:bg-slate-700
                                                dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                                        >
                                            Upgrade to {option.title}
                                        </button>
                                    )}
                                    {currentPlan?.includes(option.title) && (
                                        <div className="w-full mt-8 p-3 text-lg font-medium text-center rounded-lg bg-slate-200 text-slate-800">
                                            Current Plan
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>   
                </>
            )}
            { !selectedPlan && (!user && !currentPlan) && (
            <>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                Get A Free Plan Or Get A Pro & <br />
                <span className="bg-gradient-to-r mt-1 from-sky-950 to-sky-600 text-slate-200">
                    You Can Start Teaching Now.
                </span>
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {pricingOptions.map((option) => (
                        <div key={option.title} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md">
                            <div className={`flex flex-col justify-between p-8 h-full rounded-xl ${
                                currentPlan?.includes(option.title) 
                                    ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-slate-100' 
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                            }`}>
                                <div>
                                    <p className="text-3xl mb-4">{option.title}</p>
                                    <p className="mb-6">
                                        <span className="text-4xl mr-2">{option.price}</span>
                                        <span className="text-slate-400 tracking-tight">/month</span>
                                    </p>
                                    <ul className="space-y-3">
                                        {option.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle2 className="flex-shrink-0 w-6 h-6 mr-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {!currentPlan?.includes(option.title) && (
                                    <button
                                        onClick={() => (
                                            handlePlanSelect(option.title)
                                            // nav("/subscription")
                                            )}
                                        className="w-full mt-8 p-3 text-lg font-medium rounded-lg transition duration-200
                                            bg-slate-800 text-slate-100 hover:bg-slate-700
                                            dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                                    >
                                        Upgrade to {option.title}
                                    </button>
                                )}
                                {currentPlan?.includes(option.title) && (
                                    <div className="w-full mt-8 p-3 text-lg font-medium text-center rounded-lg bg-slate-200 text-slate-800">
                                        Current Plan
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </>
            )}
            
        </div>
            <div className="flex md:flex-row items-start justify-between">
                {showUserForm && selectedPlan && (
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                        UnLocking {selectedPlan?.includes("Pro") ? "The Pro Membership [200+ Courses creation] - " :
                        selectedPlan?.includes("Enterprise") ? "The Ultimate Enterprise Plan [500+ Courses creation] - " :
                        "Student Free Membership [5+ Courses creation] - "} 
                        <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                            {selectedPlan}
                        </span>
                    </h2>
                )}
            </div>

            <div className="flex gap-x-16 flex-col items-center justify-between mx-2">
                
                {(currentPlan?.includes(selectedPlan!) && showUserForm) 
                ? (
                    <>
                    <NewUserForm initialData={user!} selectedPlan={selectedPlan!} /></>
                ) : showUserForm && selectedPlan ? (
                    <><Button
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        onClick={() => (resetPlan())} variant="link">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        come back to subscription plans
                    </Button>
                    <NewUserForm initialData={user!} selectedPlan={selectedPlan!} /></>
                ) : showUserForm && (
                    <NewUserForm initialData={user!} selectedPlan={selectedPlan!} />
                )}
                { currentPlan?.includes('Enterprise') ? (
                    <InstitutionForNewUserForm initialData={institution} userId={userId!} />
                ): showInstitutionForm && (
                    <InstitutionForNewUserForm initialData={institution} userId={userId!} />
                )}
            </div>
        <Footer />
        </>
    );
};

export default SubscriptionPage;
