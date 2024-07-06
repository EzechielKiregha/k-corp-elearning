import React from 'react'
import { features, pricingOptions } from '../constants'
import { MRT_FilterOptionMenu } from 'material-react-table'
import { CheckCircle2 } from 'lucide-react'

const Pricing = () => {
    return (
        <div id='pricing' className="mt-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">Check Our Plans</h2>
            <div className="flex flex-wrap">
                {pricingOptions.map((option) => (
                    <div key={option.title} className="w-full lg:w-1/3 sm:w-1/2 p-2">
                        <div className="p-10 border border-slate-700  text-slate-100 rounded-xl bg-gradient-to-r 
                                from-slate-950 to-sky-600 ">
                            <p className="text-4xl mb-8">
                                {option.title}
                                {option.title === "Pro" && (
                                    <span className="text-xl text-blue-900 dark:text-blue-300 text-transparent bg-clip-text ml-2 mb-4">
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
                            href="#" 
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
    )
}

export default Pricing