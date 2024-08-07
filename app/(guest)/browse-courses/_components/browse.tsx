import { db } from "@/lib/db"
import Categories from "@/app/(dashboard)/(routes)/search/_components/categories";
import { getBrowseCourses } from "@/actions/get-browseCourses";
import BrowseCoursesList from "@/components/browse-courses-list";
import TGa from "@/components/CustomAnchor";
import { Button } from "@/components/ui/button";

interface searchParamsProps {
    searchParams : {
        title : string,
        categoryId : string
    }
}

const BrowseCourse = async () => {

    const categories = await db.category.findMany({
        orderBy : {
            name:"asc",
        }
    });

    const courses = await getBrowseCourses();

    // console.log("from seach, Progress :", courses[0].progress)

    return (
        <div id="courses" className="flex flex-col w-full items-center mt-2 mx-0 ">
            <div className="text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">Browse Our<br/>
                    <span className="bg-gradient-to-r from-sky-950 to-sky-600 text-slate-200">
                        Courses
                    </span>
                </h2>
            </div>
            <div className="p-5 space-y-2 w-full mt-5 mx-0">
                <Categories
                    items={categories}
                />
                <BrowseCoursesList items={courses} />
                <div className="flex justify-center my-10">
                <Button  size="sm" variant="link">
                    <TGa href="/browse-courses">more courses</TGa>
                </Button>
                    {/* <a href="#" className="px-3 py-2 mx-3 rounded-md ">Guide & Docs</a> */}
                </div>
            </div>
        </div>
    )
}

export default BrowseCourse