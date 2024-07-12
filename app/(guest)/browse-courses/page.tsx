import { db } from "@/lib/db"
import Categories from "@/app/(dashboard)/(routes)/search/_components/categories";
import { getBrowseCourses } from "@/actions/get-browseCourses";
import BrowseCoursesList from "@/components/browse-courses-list";
import SearchInput from "@/components/search-input";
import MainNavbar from "../_components/MainNavbar";
import Footer from "../_components/Footer";

const BrowsePage = async () => {

    const categories = await db.category.findMany({
        orderBy : {
            name:"asc",
        }
    });

    const courses = await getBrowseCourses();

    // console.log("from seach, Progress :", courses[0].progress)

    return (
        <>
        <MainNavbar/>
        <div id="courses" className="flex flex-col items-center mt-2 ">
            <div className="text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-wide">Browse Our<br/>
                    <span className="bg-gradient-to-r from-sky-500 to-sky-800 text-slate-200 ">
                        Courses
                    </span>
                </h2>
            </div>
            <div className="px-6 pt-6 sm:block xl:hidden md:mb-0">
                <SearchInput/>
            </div>
            <div className="p-5 space-y-2 w-full mt-5 mx-0">
                <Categories
                    items={categories}
                />
                <BrowseCoursesList items={courses} />
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default BrowsePage