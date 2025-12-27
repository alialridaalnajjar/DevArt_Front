import { Home, Book, Search, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthCookies from "../../utils/UseAuth";
import { User } from 'lucide-react';
import { useEffect, useState } from "react";
export default function NavExpansion() {

  const { isAuthenticated, getDecodedToken,removeToken } = useAuthCookies();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = getDecodedToken();
      if (token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/profile/${token.userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setImage(data.user.profile_photo_url);
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };
    fetchProfileImage();
  }, [getDecodedToken]);

  const navigate = useNavigate();
  const token = getDecodedToken();
  const navData: { icon: React.ElementType; title: string; link: string }[] = [
    { icon: Home, title: "Home", link: "/" },
    { icon: Book, title: "Courses", link: "/Courses/All" },
    { icon: Search, title: "Search", link: "/Search" },
  ];
  const handleLogout = () => {
    removeToken();
    navigate("/Login");
  }
  return (
    <div className="bg-gray-950 pb-4 animate-slideDown">
      <div className="flex flex-col gap-1 px-4 pt-2">
        {navData.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.link}
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 transition-all hover:bg-slate-800/50 hover:text-amber-500 active:scale-95"
              key={index}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
        {isAuthenticated ? (
          <>
            <Link
              to={`/Profile/${token?.userId}`}
              className="flex items-center gap-4 rounded-lg px-2.5 py-3 text-gray-300 transition-all hover:bg-slate-800/50 hover:text-amber-500 active:scale-95"
            >
              {image ? (
                <img 
                  src={image} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-md object-cover border border-white/20 space-x-12" 
                />
              ) : (
                <User className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">{token?.username}</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="flex items-center gap-4 rounded-lg px-4 py-3 w-full text-gray-300 transition-all hover:bg-slate-800/50 hover:text-amber-500 active:scale-95"
            >
              <LogIn className="h-5 w-5 rotate-180" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/Login"
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 transition-all hover:bg-slate-800/50 hover:text-amber-500 active:scale-95"
          >
            <LogIn className="h-5 w-5" />
            <span className="text-sm font-medium">Login/Register</span>
          </Link>
        )}
      </div>

      {isAuthenticated ? null : (
        <div className="px-4 mt-3">
          <Link
            to="/Register"
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-linear-to-r from-amber-600 to-amber-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/25 transition-all hover:from-amber-700 hover:to-amber-800"
          >
            <LogIn className="h-4 w-4" />
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
