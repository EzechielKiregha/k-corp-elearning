import MainNavbar from "../_components/MainNavbar";
import Footer from "../_components/Footer";

const AboutPage = () => {

    return (
        <>
        <MainNavbar/>
        <div id="courses" className="flex flex-col items-center">
            
            <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-800 flex flex-col items-center p-4">
                <div className="max-w-4xl w-full bg-white dark:bg-slate-900 shadow-md rounded-lg p-8 mt-10">
                    <h2 className="text-3xl text-center sm:text-5xl lg:text-6xl tracking-wide">About<br/>
                        <span className="bg-gradient-to-r from-sky-500 to-sky-800 text-slate-200 ">
                            Us
                        </span>
                    </h2>
                    <section className="mb-6">
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                    <p className="mt-2">Empowering African youth through accessible and quality education.</p>
                    </section>
                    <section className="mb-10">
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                    <p className="mt-2">To create a world where education is accessible to everyone, regardless of geographical or financial barriers.</p>
                    </section>
                    <section className="mb-10">
                    <h2 className="text-2xl font-semibold">Our Story</h2>
                    <p className="mt-2">
                        K-Corp E-Learning was founded to address the educational challenges faced by many in Africa, especially in the Democratic Republic of the Congo. 
                        Inspired by personal experiences, we strive to provide a platform that bridges the gap and offers quality education to those who need it most.
                    </p>
                    </section>
                    <section className="mb-10">
                    <h2 className="text-2xl font-semibold">Meet the Team</h2>
                    <p className="mt-2">Kambale Kiregha Ezechiel - Project Lead and Sole Developer</p>
                    <p className="mt-2">
                        As the only team member, I am responsible for all aspects of the project, including development, design, and implementation. 
                        Growing up in the Democratic Republic of the Congo (DRC), I understand firsthand the challenges of limited access to education and technology. 
                        This experience drives my passion to create a platform that can provide opportunities for African youth to learn, grow, and succeed.
                    </p>
                    </section>
                </div>
                </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default AboutPage