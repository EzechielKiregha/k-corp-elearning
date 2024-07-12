import { Book, Globe, Users, Laptop, UserCheck, Clock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { key : 1, label: "Home", href: "/" },
  { key : 2, label: "Contact", href: "/contact" },
  { key : 3, label: "About", href: "/about"},
  { key : 3, label: "Teach Mode", href: "/teacher/courses" },
  { key : 4, label: "Features", href: "/#features"  },
  { key : 5, label: "Courses", href: "/#courses"},
  { key : 6, label: "Testimonials", href: "/#testimonials" },
  
  
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "The courses are incredibly comprehensive and easy to follow. I've learned so much!",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "Fantastic platform with a great selection of courses and amazing instructors.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "I love the flexibility and the quality of the content. Highly recommend!",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "The learning experience is top-notch. The interactive courses make learning fun and engaging.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "An excellent platform for upskilling. The courses are up-to-date and very informative.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "Great community and support. The platform has helped me advance my career significantly.",
  },
];

export const features = [
  {
    icon: <Book />,
    text: "Comprehensive Courses",
    description: "Access a wide range of courses covering various subjects and skills.",
  },
  {
    icon: <Globe />,
    text: "Learn Anywhere",
    description: "Study at your own pace from anywhere in the world with our online platform.",
  },
  {
    icon: <Users />,
    text: "Community Support",
    description: "Join a vibrant community of learners and get support from peers and instructors.",
  },
  {
    icon: <Laptop />,
    text: "Interactive Content",
    description: "Engage with interactive lessons, quizzes, and hands-on projects.",
  },
  {
    icon: <UserCheck />,
    text: "Expert Instructors",
    description: "Learn from industry experts and experienced professionals.",
  },
  {
    icon: <Clock />,
    text: "Flexible Scheduling",
    description: "Set your own learning schedule and progress at your own pace.",
  },
];
export const checklistItems2 = [
  {
    title: "Advanced Analytics",
    description: "Gain insights into learner progress and course effectiveness with detailed analytics.",
  },
  {
    title: "Secure and Reliable",
    description: "Ensure data privacy and security with robust security measures.",
  },
  {
    title: "Collaborative Tools",
    description: "Enable seamless collaboration among instructors and learners with integrated tools.",
  },
]; 
export const checklistItems = [
  {
    title: "Enhanced Learning Experience",
    description: "Provide an enriched learning experience with interactive courses and personalized content.",
  },
  {
    title: "Scalable for Large Institutions",
    description: "Easily scale to accommodate a growing number of users and institutions.",
  },
  {
    title: "Customizable Courses",
    description: "Tailor courses to fit the specific needs and requirements of your organization.",
  },
  
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0.00",
    features: [
      "Access to all courses",
      "Community support",
      "Create up to 5 courses",
      "Basic course analytics",
    ],
  },
  {
    title: "Pro",
    price: "$11.99",
    features: [
      "Access to all courses",
      "Priority support",
      "Create unlimited courses",
      "Advanced course analytics",
      "Certificates of completion for students",
    ],
  },
  {
    title: "Enterprise",
    price: "$68.99",
    features: [
      "Access to all courses",
      "Dedicated account manager",
      "Create unlimited courses",
      "Custom branding for courses",
      "Advanced course and user analytics",
      "Team collaboration tools",
      "API access for integration",
    ],
  },
];



export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#features", text: "Features" },
  { href: "#courses", text: "Courses" },
  { href: "#testimonials", text: "Testimonials" },
  { href: "#pricing", text: "Pricing" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
