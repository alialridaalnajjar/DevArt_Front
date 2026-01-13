import { Book, ChevronDown, LockKeyhole, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthCookies from "../utils/UseAuth";
import NavExpansion from "../components/Reusable/NavExpansion";
export default function DeprecatedNavbar() {
  const [showNav, setShowNav] = useState<boolean>(false);
  const { isAuthenticated, getDecodedToken } = useAuthCookies();
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

  const token = getDecodedToken();
  return (
    <>
      {/*Pc Screens! */}
      <nav className=" bg-gray-950 sticky top-0 z-50 hidden lg:block">
        <div className=" mx-5 px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo --*/}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600">
                {/* AI GENed */}
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-orange-500">
                Dev<span className="text-amber-50">Art</span>
              </span>
            </Link>
            {/* Navigation divs */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="text-sm hover:cursor-pointer font-medium text-white transition-colors hover:text-orange-500"
              >
                Home
              </Link>
              <Link
                to="/Courses/All"
                className="text-sm hover:cursor-pointer font-medium text-white transition-colors hover:text-orange-500"
              >
                Courses
              </Link>
              <Link
                to="/Quiz"
                className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-orange-500 hover:cursor-pointer"
              >
                <Book className="h-4 w-4" />
                Quiz
              </Link>
              {isAuthenticated && token?.role.toLowerCase() === "admin" ? (
                <Link
                  to={`/admin/${token?.userId}`}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-orange-500 hover:cursor-pointer"
                >
                  <LockKeyhole className="h-4 w-4" />
                  Admin Panel
                </Link>
              ) : null}
              {isAuthenticated && image ? (
                <Link
                  to={`/Profile/${token?.userId}`}
                  className="text-sm mr-2 flex flex-row items-center justify-center hover:cursor-pointer font-medium text-white transition-colors hover:text-orange-500"
                >
                  <img
                    src={image}
                    alt=""
                    className="h-8 w-8 rounded-lg object-cover border border-white/20 hover:border-orange-500 "
                  />
                </Link>
              ) : isAuthenticated ? (
                <Link
                  to={`/Profile/${token?.userId}`}
                  className="text-sm hover:cursor-pointer font-medium text-white transition-colors hover:text-orange-500"
                >
                  {token?.username}{" "}
                  <ChevronDown className="inline-block h-4 w-4 mb-1" />
                </Link>
              ) : (
                <Link
                  to="/Login"
                  className=" rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:brightness-110 hover:cursor-pointer"
                >
                  Login/Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* for mobules */}
      <nav className="lg:hidden sticky z-50 top-0 bg-gray-950 border-b border-slate-800 pb-2  ">
        <div className="mx-5  ">
          <div className="w-full flex flex-row items-center justify-between pt-3 ">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-orange-500">DevArt</span>
            </Link>
            <Menu
              className="text-orange-500"
              size={25}
              onClick={() => setShowNav(!showNav)}
            />
          </div>
        </div>

        {showNav && <NavExpansion />}
      </nav>
    </>
  );
}
