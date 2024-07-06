import Image from "next/image"
import { testimonials } from "../constants"

const Testimonials = () => {
    return (
        <div id="testimonials" className="mt-20 tracking-wide ">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
                What people are saying
            </h2>
            <div className="flex flex-wrap justify-center">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
                        <div className="text-white bg-sky-950 border border-slate-800 rounded-md text-md p-6 font-thin">
                            <p>{testimonial.text}</p>
                            <div className="flex items-start mt-8">
                                <Image 
                                src={testimonial.image} 
                                alt={testimonial.user} 
                                className="w-12 h-12 mr-6 rounded-full border border-slate-300"
                                />
                                <div>
                                    <h5>{testimonial.user}</h5>
                                    <span className="text-sm font-normal italic text-slate-400">
                                        {testimonial.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials