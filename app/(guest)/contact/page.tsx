import MainNavbar from "../_components/MainNavbar";
import Footer from "../_components/Footer";
import TGa from "@/components/CustomAnchor";

const ContactPage = () => {

    return (
        <>
        <MainNavbar/>
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center p-4">
            <div className="max-w-2xl w-full bg-white dark:bg-slate-800 shadow-md rounded-lg p-8 mt-10">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide">Contact<br/>
                        <span className="bg-gradient-to-r from-sky-500 to-sky-800 text-slate-200 ">
                            Us
                        </span>
                    </h2>
                <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
                    <input type="text" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                    <input type="email" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Subject</label>
                    <input type="text" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
                    <textarea className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" rows={4}></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">Send Message</button>
                </div>
                </form>
                <div className="mt-10">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p className="mt-2">Email: contact@k-corpelearning.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 1234 Learning St, Kigali, Rwanda</p>
                </div>
                <div className="mt-6 flex space-x-4 justify-center">
                <TGa href="#" className="text-blue-500">Facebook</TGa>
                <TGa href="#" className="text-blue-500">Twitter</TGa>
                <TGa href="#" className="text-blue-500">LinkedIn</TGa>
                </div>
            </div>
            </div>
        <Footer/>
        </>
        
    )
}

export default ContactPage