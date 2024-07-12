import MainNavbar from './_components/MainNavbar';
import HeroSection from './_components/HeroSection';
import FeatureSection from './_components/FeatureSection';
import Workflow from './_components/Workflow';
import Pricing from './_components/Pricing';
import Testimonials from './_components/Testimonials';
import Footer from './_components/Footer';
import BrowseCourse from './browse-courses/_components/browse';

export default function Guest() {

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
                <div className='p-4 dark:bg-slate-900'></div>
            </div>
        </>
    )
}