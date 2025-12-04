import { Link } from "react-router-dom";
import  useAuthCookies  from "../../utils/UseAuth";
import { horizontalLineData } from "../data/DisplayData";
import Horizontal from "./cards/Horizontal";
import { useState } from "react";
export default function Login() {
  const { saveToken } = useAuthCookies();
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    setError("");

    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!credentials.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }

      const json = await response.json();
      console.log(json);
      saveToken(json.token);
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      {/* For mobiles */}
      <div className="lg:hidden min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-zinc-900 text-white p-5">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto min-h-screen">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-linear-to-br from-amber-600 to-amber-700 rounded-2xl mb-4 shadow-xl">
              <svg
                className="w-10 h-10"
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
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <h2 className="text-gray-400 text-sm">
              Continue your learning journey
            </h2>
          </div>

          <div className="w-full space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={credentials.email}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 rounded border-slate-700 bg-slate-800/50 text-amber-600 focus:ring-amber-600"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-amber-500 hover:text-amber-400 transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-lg transition duration-200 mt-6 shadow-lg shadow-amber-900/50"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link
                to="/Register"
                className="text-amber-500 font-medium hover:text-amber-400 transition"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-zinc-900">
        {/* Left Side */}
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
              courses, documentation, tutorials, code samples, presentations,
              and more resources.
            </p>
            <div className="mt-12 space-y-4">
              {horizontalLineData.map((item, index) => (
                <Horizontal key={index} text={item.text} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex items-center justify-center p-16 bg-slate-900/50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">
                Welcome Back
              </h2>
              <p className="text-gray-400">Sign in to continue learning</p>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  type="password"
                  value={credentials.password}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:bg-slate-800/70 transition"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 rounded border-slate-700 bg-slate-800/50 text-amber-600 focus:ring-amber-600 cursor-pointer"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-amber-500 hover:text-amber-400 transition"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-lg transition duration-200 mt-6 shadow-lg shadow-amber-900/50"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Don't have an account?{" "}
                <Link
                  to="/Register"
                  className="text-amber-500 font-medium hover:text-amber-400 transition"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
