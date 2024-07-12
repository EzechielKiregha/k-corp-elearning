"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import MainNavbar from '../_components/MainNavbar';
import { pricingOptions } from '../constants';
import Footer from '../_components/Footer';
import NewUserForm from './_forms/user-form';
import InstitutionForNewUserForm from './_forms/inst-form';
import { useUser } from '@/hooks/use-User';
import { useBusiness } from '@/hooks/use-Business';

const SubscriptionPage = () => {
    const { isLoaded, userId } = useAuth();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showInstitutionForm, setShowInstitutionForm] = useState(false);
    const user = useUser(userId);
    
    if (!userId) return redirect("/sign-up");
    
    const institution = useBusiness(user?.institutionId, userId);
    
    useEffect(() => {
        if (user && user.subscriptionPlan) {
            setCurrentPlan(user.subscriptionPlan)
        }
    }, [ user, userId]);

    

    const handlePlanSelect = (plan: string) => {
        if (plan === "Enterprise") {
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
        <div id='pricing' className='flex flex-col items-center justify-center'>
            {!isLoaded && (
            <div className="absolute h-full w-full bg-slate-500/20 dark:bg-slate-800 dark:text-slate-200 top-0 right-0 rounded-m flex items-center justify-center">
                <Loader2 className="animate-spin h-20 w-20 text-sky-700" />
            </div>
            )}

            {currentPlan && (
            <>
                <div className="flex md:flex-row items-start justify-between">
                    {currentPlan && (
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                            You have UnLocked {currentPlan === "Pro" ? "The Pro Membership [200+ Courses creation] - " :
                            currentPlan === "Enterprise" ? "The Ultimate Enterprise Plan [500+ Courses creation] - " :
                            "Le Gratuit [5+ Courses creation] - "} 
                            <span className="bg-gradient-to-r  from-emerald-900  to-emerald-600 text-slate-200">
                                {currentPlan}
                            </span>
                        </h2>
                    )}
                </div>
                <div className="flex flex-wrap">
                    {pricingOptions.map((option) => (
                        option.title === currentPlan && (
                            <div key={option.title} className="w-full lg:w-1/3 sm:w-1/2 p-2">
                            <div className="lg:flex-col xl:flex-col border-slate-700 md:flex-col md:flex sm:flex-col 
                            lg:w-[900px] md:w-[700px] xs:w-[500px] lg:h-[460px] md:h-[520px] xs:h-[420px] 
                            from-emerald-900  to-emerald-600 p-10 border text-slate-100 rounded-xl bg-gradient-to-r ">
                                <div>
                                    <p className="text-4xl mb-8">{option.title}</p>
                                    <p className="mb-8">
                                        <span className="text-5xl mt-6 mr-2">{option.price}</span>
                                        <span className="text-slate-400 tracking-tight">/month</span>
                                    </p>
                                </div>
                                <div>
                                    <ul>
                                        {option.features.map((feature, index) => (
                                            <li key={index} className="mt-3 flex  items-start">
                                            <CheckCircle2 />
                                            <span className="ml-2">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {option.title !== currentPlan && (
                                <button
                                    onClick={() => handlePlanSelect(option.title)}
                                    className="inline-flex justify-center items-center text-center w-full h-12 p-2 mt-20 text-xl tracking-tight border hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-white dark:hover:text-slate-900 dark:text-slate-100 border-blue-900 rounded-lg transition duration-200"
                                >
                                    Get Membership
                                </button>
                                )}
                            </div>
                            </div>
                        ) 
                    ))}
                </div>   
            </>
            ) } 
            { !selectedPlan && !user && (
            <>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                Select your subscription &<br />
                <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                    You can start teaching today.
                </span>
                </h2>
                <div className="flex flex-wrap">
                {pricingOptions.map((option) => (
                    <div key={option.title} className="w-full lg:w-1/3 sm:w-1/2 p-2">
                    <div className="p-10 border  border-slate-700 text-slate-100 rounded-xl bg-gradient-to-r from-slate-950 to-sky-600">
                        <p className="text-4xl mb-8">
                        {option.title}
                        {option.title === "Pro" && (
                            <span className="text-xl text-blue-300 dark:text-sky-300 text-transparent bg-clip-text ml-2 mb-4">
                            (Most popular)
                            </span>
                        )}
                        </p>
                        <p className="mb-8">
                            <span className="text-5xl mt-6 mr-2">{option.price}</span>
                            <span className="text-slate-400 tracking-tight">/month</span>
                        </p>
                        <ul>
                        {option.features.map((feature, index) => (
                            <li key={index} className="mt-8 flex items-center">
                            <CheckCircle2 />
                            <span className="ml-2">{feature}</span>
                            </li>
                        ))}
                        </ul>
                        <button
                        onClick={() => handlePlanSelect(option.title)}
                        className="inline-flex justify-center items-center text-center w-full h-12 p-2 mt-20 text-xl tracking-tight border hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-white dark:hover:text-slate-900 dark:text-slate-100 border-blue-900 rounded-lg transition duration-200"
                        >
                        Subscribe
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </>
            )}
            <div className="flex md:flex-row items-start justify-between">
                {showUserForm && (
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                        UnLocking {selectedPlan === "Pro" ? "The Pro Membership [200+ Courses creation] - " :
                        selectedPlan === "Enterprise" ? "The Ultimate Enterprise Plan [500+ Courses creation] - " :
                        "Student Free Membership [5+ Courses creation] - "} 
                        <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                            {selectedPlan}
                        </span>
                    </h2>
                )}
            </div>

            <div className="flex gap-x-16 flex-col items-center justify-between">
                
                {currentPlan 
                ? (
                    <><a
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        href='/subscription'>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        come back to subscription plans
                    </a>
                    <NewUserForm initialData={user!} selectedPlan={selectedPlan!} /></>
                ) : showUserForm && (
                    <><a
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        href='/subscription'>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        come back to subscription plans
                    </a>
                    <NewUserForm initialData={user!} selectedPlan={selectedPlan!} /></>
                )}
                { currentPlan === "Enterprise" ? (
                    <InstitutionForNewUserForm initialData={institution} userId={userId!} />
                ): showInstitutionForm && (
                    <InstitutionForNewUserForm initialData={institution} userId={userId!} />
                    )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default SubscriptionPage;
