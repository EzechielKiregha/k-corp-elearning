import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'
import Sidebar from "./sidebar"
import { ThemeToggle } from "@/components/theme-toggle"


const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-60 transition">
            <Menu/>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar