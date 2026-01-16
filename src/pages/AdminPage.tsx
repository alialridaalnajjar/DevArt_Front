import { useState } from "react";
import ManageVideos from "../components/Admin/ManageVideos";
import Navbar from "../components/Reusable/Navbar";
import useAuthCookies from "../utils/UseAuth";
import ManageUsers from "../components/Admin/ManageUsers";

export default function AdminPage() {
  const { getDecodedToken } = useAuthCookies();
  const name = getDecodedToken()?.username || "Admin";
  const [show, setShow] = useState<string>("videos");
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-600 to-orange-500 px-6 py-8 lg:px-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-orange-100">Welcome back, {name}!</p>
        </div>
        <div className=" flex flex-row items-center justify-center gap-5 pt-2 font-semibold ">
          <h1
            className="hover:cursor-pointer hover:text-orange-500"
            onClick={() => setShow("videos")}
          >
            Videos
          </h1>
          <h1
            className="hover:cursor-pointer hover:text-orange-500"
            onClick={() => setShow("users")}
          >
            Users
          </h1>
        </div>
        {show.toLocaleLowerCase() === "videos" ? (
          <ManageVideos />
        ) : show.toLocaleLowerCase() === "users" ? (
          <ManageUsers/>
        ) : null}
      </div>
    </>
  );
}
