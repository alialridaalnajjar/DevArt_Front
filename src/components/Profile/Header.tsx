import {
  Edit,
  MapPin,
  Calendar,
  Mail,
  User,
  Award,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ProfileData } from "../../utils/Types";
import { storage } from "../../configs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useAuthCookies from "../../utils/UseAuth";
import { useParams } from "react-router-dom";

export default function ProfileHeader({
  first_name,
  last_name,
  username,
  bio,
  email,
  dob,
  location,
  created_at,
  profile_photo_url,
  setEdit,
}: ProfileData & { setEdit: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { getDecodedToken } = useAuthCookies();
  const decodedToken = getDecodedToken();
  const role = decodedToken?.role.toLocaleUpperCase() || "USER";
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>(
    profile_photo_url || ""
  );
  const { getToken } = useAuthCookies();
  const { userId } = useParams();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      return;
    }

    try {
      setUploading(true);

      // Use consistent filename so it replaces the old one!!
      const fileName = `profile_photos/${username}_profile_photo`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);

      const token = getToken();

      try {
        const response = await fetch(
          `http://localhost:3000/api/profile/edit/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              first_name: first_name,
              last_name: last_name,
              username: username,
              bio: bio,
              email: email,
              dob: dob,
              location: location,
              created_at: created_at,
              profile_photo_url: downloadURL,
            }),
          }
        );

        if (response.ok) {
          setNewPhotoUrl(downloadURL);
          setImageFile(null);
          setImagePreview(null);
          alert("Profile photo updated successfully!");
        }
      } catch (backendError) {
        console.error("Backend error:", backendError);
        setNewPhotoUrl(downloadURL);
        setImageFile(null);
        setImagePreview(null);
        alert("Photo uploaded to Firebase!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const cancelImageUpload = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-gray-950  backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
      {/* Cover Image */}
      <div className="h-32 md:h-48 bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 relative">
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-transparent"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        {/* Profile Picture & Edit Button */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-6">
          <div className="relative">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl border-4 border-slate-800 shadow-xl overflow-hidden bg-linear-to-br from-amber-600 to-amber-700">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : newPhotoUrl ? (
                <img
                  src={newPhotoUrl}
                  alt={`${first_name} ${last_name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white text-4xl font-bold">
                  {first_name?.[0]}
                  {last_name?.[0]}
                </div>
              )}
            </div>

            {/* Upload Controls */}
            {imageFile ? (
              <div className="absolute -bottom-12 left-0 flex gap-2 mt-2">
                <button
                  onClick={handleSaveImage}
                  disabled={uploading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {uploading ? "Uploading..." : "Save"}
                </button>
                <button
                  onClick={cancelImageUpload}
                  disabled={uploading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </button>
              </div>
            ) : (
              <label className="absolute -bottom-2 -right-2 bg-amber-600 hover:bg-amber-700 border-2 border-slate-800 p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                <Upload className="h-4 w-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            <div className="absolute top-2 right-2 bg-green-500 border-2 border-slate-800 px-1 py-1 rounded-full text-xs font-semibold text-white shadow-lg"></div>
          </div>

          <button
            onClick={() => setEdit(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-amber-900/50"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        {/* Name & Username */}
        <div className="mb-6 mt-12 sm:mt-6">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {first_name} {last_name}
            </h1>
            <div className="flex items-center gap-1 border border-amber-600/30 bg-amber-600/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
              <Award className="h-3 w-3" />
              {role}
            </div>
          </div>
          <p className="text-gray-400 flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />@{username}
          </p>
        </div>

        {/* Bio */}
        <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed text-sm sm:text-base">
          {bio || (
            <span className="text-gray-500 italic">
              You have not set a bio yet.
            </span>
          )}
        </p>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 hover:border-amber-600/30 transition-colors">
            <Mail className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 hover:border-amber-600/30 transition-colors">
            <Calendar className="h-4 w-4 text-amber-500 shrink-0" />
            <span>{dob ? new Date(dob).toLocaleDateString() : "Not set"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 hover:border-amber-600/30 transition-colors">
            <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
            <span>{location || "Not set"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 hover:border-amber-600/30 transition-colors">
            <Calendar className="h-4 w-4 text-amber-500 shrink-0" />
            <span>
              Joined{" "}
              {created_at
                ? new Date(created_at).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-400">Skills:</span>
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Tailwind CSS",
            "Python",
            "PostgreSQL",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-amber-600/10 text-amber-400 border border-amber-600/30 hover:bg-amber-600/20 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
