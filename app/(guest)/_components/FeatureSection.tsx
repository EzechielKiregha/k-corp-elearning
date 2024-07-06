import { features } from "../constants";

const FeatureSection = () => {
    return (
        <div id="features" className=" relative mt-20 border-b border-slate-800 min-h[800px]">
            <div className="text-center">
                <span className="dark:bg-slate-300 dark:text-sky-900 bg-sky-800 text-slate-200 rounded-full h-6 text-sm font-medium px-2 py-1">Our Features</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">Why Choose<br/>
                    <span className="bg-gradient-to-r from-sky-500 to-sky-800 text-transparent bg-clip-text ">
                        K-Corp eLearning
                    </span> ?
                </h2>
            </div>
            <div className="flex flex-wrap mt-10 lg:mt-20">
                {features.map((feature, index) => (
                    <div key={index} className="w-full sm:1/2 lg:w-1/3">
                        <div className="flex">
                                <div className="flex dark:text-sky-800 text-slate-100 mx-6 h-10 w-10 p-2 
                                bg-sky-600 dark:bg-slate-100 justify-center items-center rounded-full">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="mt-2 mb-5 text-xl">{feature.text}</h4>
                                    <p className="text-md p-2 mb-20 text-slate-700 dark:text-slate-400">{feature.description}</p>
                                </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default FeatureSection;
