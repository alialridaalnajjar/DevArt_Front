import { useState } from "react";
import { Link } from "react-router-dom";
import { RoleType, type UserRole } from "../../utils/Types";
import { horizontalLineData } from "../data/DisplayData";
import Horizontal from "./cards/Horizontal";
export default function Register() {
  const [user, setUser] = useState<UserRole>({
    username: "",
    email: "",
    password: "",
    role: RoleType.USER,
    created_at: new Date(),
    profile_photo_url: null,
    DOB: null,
    location: null,
    first_name: "",
    last_name: "",
  });
  const handleRegister = async () => {
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed.");
      }
    });
  };
  return (
    <>
      <div className="lg:hidden min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-zinc-900 text-white p-5">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              Join DevArt
            </h1>
            <h2 className="text-gray-400 text-sm">Elite CSFS Platform</h2>
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  First Name
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                  value={user.first_name}
                  type="text"
                  placeholder="Vladimir"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Last Name
                </label>
                <input
                  value={user.last_name}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                  type="text"
                  placeholder="Petrovsky"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Username
              </label>
              <input
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                value={user.username}
                placeholder="vladimir_dev"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                type="email"
                placeholder="example@gmail.com"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Role
              </label>
              <select
                onChange={(e) =>
                  setUser({
                    ...user,
                    role: e.target.value.toString() as RoleType,
                  })
                }
                value={user.role}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
              >
                <option value={RoleType.USER} className="bg-slate-900">
                  Student
                </option>
                <option value={RoleType.ADMIN} className="bg-slate-900">
                  Instructor
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Date of Birth
              </label>
              <input
                onChange={(e) =>
                  setUser({ ...user, DOB: new Date(e.target.value) })
                }
                type="date"
                value={user.DOB ? user.DOB.toISOString().split("T")[0] : ""}
                max={new Date().toISOString().split("T")[0]}
                aria-label="Date of Birth"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Location
              </label>
              <input
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                value={user.location || ""}
                type="text"
                placeholder="Country, City"
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
              />
            </div>

            <button
              onClick={() => handleRegister()}
              className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-lg transition duration-200 mt-6 shadow-lg shadow-amber-900/50"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-500 font-medium hover:text-amber-400 transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-zinc-900">
        {/* Left side  */}
        <div className="w-1/2 flex flex-col justify-center items-center p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-amber-600/20 to-transparent"></div>
          <div className="relative z-10 max-w-lg">
            <div className="inline-block p-6 bg-linear-to-br from-amber-600 to-amber-700 rounded-3xl mb-8 shadow-2xl">
              <svg
                className="w-16 h-16 text-white"
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
            <h1 className="text-6xl font-bold mb-6 bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              DevArt
            </h1>
            <p className="text-gray-300 text-xl mb-4">Elite CSFS Platform</p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Join developers mastering their craft. Get access to open source
              courses, documentation, tutorials, code samples,
              <br />
              presentations, and more resources.
            </p>
            <div className="mt-12 space-y-4">
              {horizontalLineData.map((item, index) => (
                <Horizontal key={index} text={item.text} />
              ))}
            </div>
          </div>
        </div>

        {/* right div same aws the mobile one*/}
        <div className="w-1/2 flex items-center justify-center p-16 bg-slate-900/50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">
                Create Account
              </h2>
              <p className="text-gray-400">Start your learning journey today</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    First Name
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, first_name: e.target.value })
                    }
                    value={user.first_name}
                    type="text"
                    placeholder="Vladimir"
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Last Name
                  </label>
                  <input
                    value={user.last_name}
                    onChange={(e) =>
                      setUser({ ...user, last_name: e.target.value })
                    }
                    type="text"
                    placeholder="Petrovsky"
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Username
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  type="text"
                  value={user.username}
                  placeholder="vladimir_dev"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Role
                  </label>
                  <select
                    onChange={(e) =>
                      setUser({
                        ...user,
                        role: e.target.value.toString() as RoleType,
                      })
                    }
                    value={user.role}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                  >
                    <option value={RoleType.USER} className="bg-slate-900">
                      Student
                    </option>
                    <option value={RoleType.ADMIN} className="bg-slate-900">
                      Instructor
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, DOB: new Date(e.target.value) })
                    }
                    type="date"
                    value={user.DOB ? user.DOB.toISOString().split("T")[0] : ""}
                    max={new Date().toISOString().split("T")[0]}
                    aria-label="Date of Birth"
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Location
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, location: e.target.value })
                  }
                  value={user.location || ""}
                  type="text"
                  placeholder="Country, City"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>

              <button
                onClick={() => handleRegister()}
                className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-lg transition duration-200 mt-6 shadow-lg shadow-amber-900/50"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-500 font-medium hover:text-amber-400 transition"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      footer
    </>
  );
}
