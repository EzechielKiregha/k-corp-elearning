import NavbarRoutes from "@/components/navbar-routes"
import MobileSidebar from "./mobile-sidebar"

const Navbar = () => {
    return (
        <div className="p-4 h-full flex bg-white border-b items-center shadow-sm">
            <MobileSidebar />
            <NavbarRoutes/>
        </div>
    )
}

export default Navbar