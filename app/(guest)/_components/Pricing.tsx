"use client"
import React, { useEffect, useState } from 'react'
import { pricingOptions } from '../constants'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { useUser } from '@/hooks/use-User'

const Pricing = () => {
    const {userId} = useAuth();
    const user = useUser(userId);
    
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    
    useEffect(() => {
        if (user && user.subscriptionPlan) {
            setCurrentPlan(user.subscriptionPlan)
        } else {
            setCurrentPlan(null)
        }
    }, [ user, userId]);

    return (
        <>
            {currentPlan && (
            <>
            <div id='pricing' className="mt-0 lg:flex lg:justify-center lg:items-center lg:flex-col">
                <div className="flex md:flex-row ">
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
                <div className="flex ">
                    {pricingOptions.map((option) => (
                        option.title === currentPlan && (
                            <div key={option.title} className="w-full lg:w-1/3 sm:w-1/2 p-2">
                            <div className="lg:flex-col border-slate-700 md:flex-col md:flex sm:flex-col 
                            lg:w-[900px] md:w-[700px] xs:w-[500px] lg:h-[460px] md:h-[520px] xs:h-[420px] 
                            from-emerald-900 to-emerald-600 p-10 border text-slate-100 rounded-xl bg-gradient-to-r ">
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
                                
                            </div>
                            </div>
                        ) 
                    ))}
                </div>   
                </div>
            </>
            ) }
            {!currentPlan && (
                <>
                <div id='pricing' className="mt-10">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">Join Us &<br />
                <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200 ">
                    Host your courses today. 
                </span>
                </h2>
                <div className="flex flex-wrap">
                {pricingOptions.map((option) => (
                    <div key={option.title} className="w-full lg:w-1/3 sm:w-1/2 p-2">
                        <div className="p-10 border border-slate-700  text-slate-100 rounded-xl bg-gradient-to-r 
                                from-slate-950 to-sky-600 ">
                            <p className="text-4xl mb-8">
                                {option.title}
                                {option.title === "Pro" && (
                                    <span className="text-xl text-blue-300 dark:text-blue-300 text-transparent bg-clip-text ml-2 mb-4">
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
                                        <CheckCircle2/>
                                        <span className="ml-2">{feature}</span>
                                    </li>
                                ))}  
                            </ul>
                            <a
                                href='/subscription' 
                                className="inline-flex justify-center itens-center text-center w-full 
                                h-12 p-2 mt-20 text-xl tracking-tight border hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-white dark:hover:text-slate-900
                                border-blue-900 rounded-lg transition duration-200 ">
                                    Subscribe
                            </a>
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