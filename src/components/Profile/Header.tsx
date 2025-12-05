import { Edit, MapPin, Calendar, Mail, User, Award } from "lucide-react";
import { useState } from "react";
import type { ProfileData } from "../../utils/Types";

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
}: ProfileData) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-[#243447] rounded-2xl border border-white/10 overflow-hidden">
      <div className="h-32 md:h-48 bg-linear-to-r from-orange-600 to-orange-400" />

      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-4">
          <div className="relative">
            <div className="max-h-50 max-w-40 w-24 sm:h-32 sm:w-32 border-4 border-[#243447] rounded-xl overflow-hidden">
              <img
                className="object-fit"
                src={
                  profile_photo_url || "/professional-developer-portrait.png"
                }
                alt={`${first_name} ${last_name}`}
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-orange-500/50 border-2 border-[#243447] px-1 py-0.5">
              A.N
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>

        {/* Name & Username */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {first_name} {last_name}
            </h1>
            <div className="border-orange-600 text-orange-400">
              <Award className="h-3 w-3 mr-1" />
              Pro Member
            </div>
          </div>
          <p className="text-gray-400 flex items-center gap-2">
            <User className="h-4 w-4" />
            {username}
          </p>
        </div>

        {/* Bio */}
        <p className="text-gray-300 mb-4 max-w-2xl leading-relaxed">
          {bio || "You have not set a bio yet."}
        </p>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#1a2332] rounded-lg px-4 py-3">
            <Mail className="h-4 w-4 text-orange-500" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#1a2332] rounded-lg px-4 py-3">
            <Calendar className="h-4 w-4 text-orange-500" />
            <span>{dob.toString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#1a2332] rounded-lg px-4 py-3">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>{location || "Location not set"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#1a2332] rounded-lg px-4 py-3">
            <Calendar className="h-4 w-4 text-orange-500" />
            <span>
              {" "}
              Joined{" "}
              {created_at
                ? new Date(created_at).toDateString()
                : "Join date not set"}
            </span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-gray-400 mr-2">
            Skills:
          </span>
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Tailwind CSS",
            "Python",
            "PostgreSQL",
          ].map((skill) => (
            <div
              key={skill}
              className="bg-orange-600/20 text-orange-400 border-orange-600/30 hover:bg-orange-600/30"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
