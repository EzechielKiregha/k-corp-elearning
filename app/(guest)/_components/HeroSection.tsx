const HeroSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 ">
            <div className="text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">Empower your future<br/>
                    <span className="bg-gradient-to-r from-sky-500 to-sky-800 text-transparent bg-clip-text ">
                        K-Corp eLearning
                    </span>
                </h2>
            </div>
            <p className="text-lg mt-10 text-center text-slate-800 dark:text-slate-300 max-w-4xl">
                Discover high-quality education and unlock new opportunities. Join our community and start learning today!
            </p>
            <div className="flex justify-center my-10">
                <a href="/sign-in" className="bg-gradient-to-r text-slate-200 from-sky-950 to-sky-600 px-3 py-2
                rounded-md ">Get Started</a>
                <a href="#" className="px-3 py-2 mx-3 rounded-md ">Guide & Docs</a>
            </div>
            <div className="flex mt-10 justify-center">
                <video src={require('../assets/video1.mp4')} autoPlay loop muted className="rounded-lg w-1/2 border border-blue-700 shadow-blue-400 mx-2 my-4"/>
                <video src={require('../assets/video2.mp4')}  autoPlay loop muted className="rounded-lg w-1/2 border border-blue-700 shadow-blue-400 mx-2 my-4"/>
            </div>
        </div>
    )
}

export default HeroSection