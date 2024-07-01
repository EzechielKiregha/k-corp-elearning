import { db } from "@/lib/db"
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesList from "@/components/courses-list";

interface searchParamsProps {
    searchParams : {
        title : string,
        categoryId : string
    }
}

const Search = async ({
    searchParams,
} : searchParamsProps) => {

    const { userId } = auth()

    if(!userId){
        return redirect("/")
    }


    const categories = await db.category.findMany({
        orderBy : {
            name:"asc",
        }
    });

    const courses = await getCourses({
        userId,
        ... searchParams,
    });

    console.log("from seach, Progress :", courses[0].progress)

    return (
        <>
            <div className="px-6 pt-6 md:hidden block md:mb-0">
                <SearchInput/>
            </div>
            <div className="p-6 space-y-4">
                <Categories
                    items={categories}
                />
                <CoursesList items={courses} />
            </div>
        </>
    )
}

export default Search