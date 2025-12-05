import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SignOut from "../components/Auth/cards/SignOut";
import ProfileAchievements from "../components/Profile/Acheivments";
import ProfileHeader from "../components/Profile/Header";
import ProfileCourses from "../components/Profile/ProfileCourses";
import ProfileStats from "../components/Profile/ProfileStats";
import Navbar from "../components/Reusable/Navbar";
import Loading from "../utils/Loading";
import type { ProfileData } from "../utils/Types";
export default function ProfilePage() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  // just a  placeholder for error as we are gonna show the error compoenent instead of mock DATA!
  const [profileData, setProfileData] = useState<ProfileData>(
    {} as ProfileData
  );
  const fetchUserData = async (userId: string) => {
    try {
      console.log("id", userId);
      const response = await fetch(
        `http://localhost:3000/api/profile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfileData({ ...data.user });
      setLoading(false);
      console.log("Fetched user data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId!);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-slate-900 py-8">
          <main className="container mx-auto px-4 py-8 lg:py-12">
            <ProfileHeader {...profileData} />
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <ProfileStats />
                <ProfileCourses />
              </div>
              <div className="space-y-8">
                <ProfileAchievements />
              </div>
            </div>
          </main>
          <SignOut />
        </div>
      )}
    </>
  );
}
