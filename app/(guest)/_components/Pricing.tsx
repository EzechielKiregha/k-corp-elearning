"use client"
import React, { useEffect, useState } from 'react'
import { pricingOptions } from '../constants'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { useUser } from '@/hooks/use-User'
import { useNavigation } from '@/hooks/useNavigation'
import { usePathname } from 'next/navigation'


const Pricing = () => {
    const {userId} = useAuth();
    const user = useUser(userId);
    const nav = useNavigation()
    
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    
    useEffect(() => {
        if (user && user.subscriptionPlan) {
            const plan = user.subscriptionPlan?.includes("Free") ? user.subscriptionPlan
            : user.subscriptionPlan?.includes("Pro") ? user.subscriptionPlan 
            : user.subscriptionPlan?.includes("Enterprise") ? user.subscriptionPlan 
            : user.subscriptionPlan?.includes("Ultimate") ? user.subscriptionPlan
            : null;
            setCurrentPlan(plan)
        } else {
            setCurrentPlan(null)
        }
    }, [ user, userId]);

    return (
        <>
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
                            {(currentPlan === "Pro" || currentPlan === "Pro MemberShip") ? "[200+ Courses creation]" :
                            (currentPlan === "Enterprise" || currentPlan === "Ultimate Enterprise Plan") ? "[500+ Courses creation]" :
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
                                                nav("/subscription")
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
            {!currentPlan && (
                <>
                <div id='pricing' className="mt-10">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">Join Us &<br />
                <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200 ">
                    Host your courses today. 
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
                                        nav("/subscription")
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
            </div>
            </>
            )}
        </>
        
    )
}

export default Pricing