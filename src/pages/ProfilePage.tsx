import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SignOut from "../components/Auth/cards/SignOut";
import ProfileAchievements from "../components/Profile/Acheivments";
import EditProfile from "../components/Profile/EditProfile";
import ProfileHeader from "../components/Profile/Header";
import ProfileCourses from "../components/Profile/ProfileCourses";
import Navbar from "../components/Reusable/Navbar";
import Loading from "../utils/Loading";
import { type ProfileData } from "../utils/Types";
import EditSkills from "../components/Profile/EditSkills";

export default function ProfilePage() {
  // states
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(
    {} as ProfileData
  );

  const fetchUserData = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was no@t ok");
      }
      const data = await response.json();
      setProfileData({ ...data.user });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId!);
  }, [userId]);

  return (
    <>
      <div className="sticky bg-gray-950  top-0 z-50">
        <Navbar />
      </div>
      {isEditingSkills && <EditSkills setIsEditingSkills={setIsEditingSkills} />}
      {edit && (
        <EditProfile
          setEdit={setEdit}
          refetchProfile={() => fetchUserData(userId!)}
          {...profileData}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-950 py-8">
          <main className="container mx-auto px-4 py-8 lg:py-12">
            <ProfileHeader {...profileData} setEdit={setEdit} setIsEditingSkills={setIsEditingSkills} />
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <ProfileCourses />
              </div>
              <div className="space-y-8">
                <ProfileAchievements />
              </div>
              <SignOut />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
