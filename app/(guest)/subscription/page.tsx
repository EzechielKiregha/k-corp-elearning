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

const SubscriptionPage = () => {

    const searchParams = useSearchParams()
    const plan = searchParams.get('selectedPlan')

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
    }, [ user, userId]);
    if (!userId) return redirect("/sign-up")

    if (plan && plan !== currentPlan){
        setSelectedPlan(plan)
    }
    
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
                    <div className="flex flex-col items-center justify-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center my-8 tracking-wide">
                            Your Current Plan:
                        </h2>
                        <span className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-emerald-900 to-emerald-600 text-slate-200 p-4 rounded-lg">
                            {currentPlan}
                        </span>
                        <p className="text-xl sm:text-2xl mt-4">
                            {currentPlan === "Pro" ? "[200+ Courses creation]" :
                            currentPlan === "Enterprise" ? "[500+ Courses creation]" :
                            "[5+ Courses creation]"}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {pricingOptions.map((option) => (
                            <div key={option.title} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md">
                                <div className={`flex flex-col justify-between p-8 h-full rounded-xl ${
                                    option.title === currentPlan 
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
                                    {option.title !== currentPlan && (
                                        <button
                                            onClick={() => handlePlanSelect(option.title)}
                                            className="w-full mt-8 p-3 text-lg font-medium rounded-lg transition duration-200
                                                bg-slate-800 text-slate-100 hover:bg-slate-700
                                                dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                                        >
                                            Upgrade to {option.title}
                                        </button>
                                    )}
                                    {option.title === currentPlan && (
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
            { !selectedPlan && !user && (
            <>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                Select your subscription &<br />
                <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                    You can start teaching today.
                </span>
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {pricingOptions.map((option) => (
                        <div key={option.title} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md">
                            <div className={`flex flex-col justify-between p-8 h-full rounded-xl ${
                                option.title === currentPlan 
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
                                {option.title !== currentPlan && (
                                    <button
                                        onClick={() => handlePlanSelect(option.title)}
                                        className="w-full mt-8 p-3 text-lg font-medium rounded-lg transition duration-200
                                            bg-slate-800 text-slate-100 hover:bg-slate-700
                                            dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                                    >
                                        Upgrade to {option.title}
                                    </button>
                                )}
                                {option.title === currentPlan && (
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
                    <>
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
        <Footer />
        </>
    );
};

export default SubscriptionPage;
