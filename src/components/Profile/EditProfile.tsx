import { X } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

export default function EditProfile({
  setEdit,
  refetchProfile,
  first_name,
  last_name,
  username,
  bio,
  email,
  dob,
  location,
  created_at,
  profile_photo_url,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  refetchProfile: () => void;
  first_name: string;
  last_name: string;
  username: string;
  bio?: string | null;
  email: string;
  dob?: Date | string | null;
  location?: string | null;
  created_at: Date | string;
  profile_photo_url?: string | null;
}) {
  const [data, setData] = React.useState({
    first_name: first_name,
    last_name: last_name,
    username: username,
    bio: bio || "",
    email: email,
    dob: dob instanceof Date ? dob.toISOString().split("T")[0] : dob || "",
    location: location || "",
    created_at: created_at,
    profile_photo_url: profile_photo_url || "",
  });

  const { userId } = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Updated data:", data);

      const response = await fetch(
        `http://localhost:3000/api/profile/edit/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.error("Failed to update profile");
        alert("Failed to update profile. Please try again.");
        return;
      }

      const updatedData = await response.json();
      console.log("Profile updated successfully:", updatedData);

      setEdit(false);

      refetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inset-0 backdrop-blur-lg min-h-screen z-20 fixed flex items-center justify-center bg-gray-950 ">
      <section className="w-[90%] max-w-2xl bg-gray-950 rounded-2xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <h5 className="text-red-600/60 text-sm">
              Please note that till now you can't edit critical data!
            </h5>
          </div>
          <button
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
            aria-label="Close"
            onClick={() => setEdit(false)}
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleEditProfile} className="flex flex-col gap-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-slate-800/70 transition disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-slate-800/70 transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Bio
            </label>
            <textarea
              name="bio"
              value={data.bio}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-slate-800/70 transition resize-none disabled:opacity-50"
            />
          </div>

          {/* Location and DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="City, Country"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-slate-800/70 transition disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                disabled={isSubmitting}
                max={new Date().toISOString().split("T")[0]}
                aria-label="Date of Birth"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:bg-slate-800/70 transition disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-slate-800">
            <button
              onClick={() => setEdit(false)}
              type="button"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg border border-slate-700 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white transition-colors font-medium shadow-lg shadow-amber-900/50 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
