import MainNavbar from './_components/MainNavbar';
import HeroSection from './_components/HeroSection';
import FeatureSection from './_components/FeatureSection';
import Workflow from './_components/Workflow';
import Pricing from './_components/Pricing';
import Testimonials from './_components/Testimonials';
import Footer from './_components/Footer';
import Search from '../(dashboard)/(routes)/search/page';
import { db } from '@/lib/db';
import BrowseCourse from './browse-courses/page';

export default async function Guest() {

    const categories = await db.category.findMany({
        orderBy : {
            name:"asc",
        }
    });

    return (
        <>
            <MainNavbar/>
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection/>
                <FeatureSection/>
                <Workflow/>
                <BrowseCourse />
                <Pricing/>
                <Testimonials/>
                <Footer/>
                <div className='mb-5'></div>
            </div>
        </>
    )
}