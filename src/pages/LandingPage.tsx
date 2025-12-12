import Courses from "../components/Landing/Courses";
import CTASection from "../components/Landing/CTA";
import Faq from "../components/Landing/Faq";
import WhyChooseUs from "../components/Landing/Why-choose-us";
import Navbar from "../components/Reusable/Navbar";
import useAuthCookies from "../utils/UseAuth";
export default function LandingPage() {
  const { isAuthenticated } = useAuthCookies();
  
  return (
    <>
      <Navbar />
      <Courses   />
      <Faq />
      <WhyChooseUs />
      {isAuthenticated || <CTASection />}
    </>
  );
}
