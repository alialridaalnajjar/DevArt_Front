import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavExpansion from "./NavExpansion";
import { Menu } from "lucide-react";
import { ChevronDown } from "lucide-react";
import useAuthCookies from "../../utils/UseAuth";
export default function Navbar() {
  const [showNav, setShowNav] = useState<boolean>(false);
  const { isAuthenticated, getDecodedToken } = useAuthCookies();
  const token = getDecodedToken();
  return (
    <>
      {/*Pc Screens! */}
      <nav className=" bg-slate-900/60  sticky top-0 z-50 hidden lg:block">
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
              <span className="text-2xl font-bold text-orange-500">DevArt</span>
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
                to="/Search"
                className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-orange-500 hover:cursor-pointer"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
              {isAuthenticated ? (
                <Link
                  to={`/Profile/${token?.userId}`}
                  className="text-sm hover:cursor-pointer font-medium text-white transition-colors hover:text-orange-500"
                >
                  {token?.username}{" "}
                  <ChevronDown className="inline-block h-4 w-4 mb-1" />
                </Link>
              ) : (
                <Link
                  to="/Register"
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

      <nav className="lg:hidden sticky z-50 top-0 bg-slate-900/60 border-b border-slate-800 pb-2  ">
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
