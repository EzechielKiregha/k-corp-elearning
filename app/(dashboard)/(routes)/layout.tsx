import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

const DashboardLayout = ({
    children
} : {
    children : React.ReactNode;
}) => {
    return ( 
        <div className="h-full">

            <div className="w-full inset-y-0 fixed md:pl-56 z-50 h-[70px]">
                <Navbar />
            </div>

            <div className="hidden md:flex w-56 h-full fixed flex-col inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 h-full pt-[70px]">
                {children} 
            </main>
            
        </div>
    );
}

export default DashboardLayout;