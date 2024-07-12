
const HackathonsPage = () => {

    return (
        <>
        <div className=" flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-10 mb-6 tracking-wide">Drop Your Email<br/>
                    <span className="bg-gradient-to-r from-sky-500 to-sky-800 text-slate-200 ">
                        Recieve our latest hackathons and courses InBox
                    </span>
                </h2>
                <form className="flex flex-col space-y-4">
                <input
                    type="text"
                    className="p-2 rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="your email here"
                />
                <button
                    type="submit"
                    className="p-2 rounded-md bg-sky-600 text-slate-200 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    Submit
                </button>
                </form>
            </div>
            </div>
        </>
        
    )
}

export default HackathonsPage