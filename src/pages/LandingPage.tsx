import { useEffect, useState } from "react";
import Courses from "../components/Landing/Courses";
import CTASection from "../components/Landing/CTA";
import Faq from "../components/Landing/Faq";
import WhyChooseUs from "../components/Landing/Why-choose-us";
import Navbar from "../components/Reusable/Navbar";
import useAuthCookies from "../utils/UseAuth";
import IsNewUser from "./Controllers/IsNewUser";
import Footer from "../components/Reusable/Footer";
export default function LandingPage() {
  const { isAuthenticated } = useAuthCookies();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const userId = 40;
  useEffect(() => {
    const handleIsNew = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/isNew/${userId}`,
          {
            method: "GET"
          }
        );
        const data = await response.json();
        setIsNewUser(data.isnew);
      } catch (error) {
        console.error("Error fetching is-new status:", error);
      }
    };

    handleIsNew();
  }, []);

  return (
    <>
      {isNewUser && isAuthenticated && <IsNewUser  setIsNewUser={setIsNewUser}/>}
      <Navbar />
      <Courses />
      <Faq />
      <WhyChooseUs />
      {isAuthenticated || <CTASection />}
      <Footer />
    </>
  );
}
