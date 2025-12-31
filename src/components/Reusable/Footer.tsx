import { Link } from "react-router-dom";
import useAuthCookies from "../../utils/UseAuth";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const { getDecodedToken } = useAuthCookies();
  const token = getDecodedToken();

  return (
    <div className="bg-linear-to-t from-orange-500/5 to-gray-950">
      <div className="lg:hidden flex flex-col items-start justify-start gap-4 p-4 ">
        <div>
          <h1 className="text-amber-50 text-2xl font-bold">
            <span className="text-orange-500">Dev</span>Art
          </h1>
          <h1 className="text-amber-50 font-medium">Learn Fast, Learn Smart</h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-px">
          <div className="text-orange-500 font-medium">Quick Links</div>
          <Link className="text-amber-50 hover:text-orange-500" to="/">
            Home
          </Link>
          <Link
            className="text-amber-50 hover:text-orange-500"
            to="/Courses/All"
          >
            Courses
          </Link>
          <Link
            className="text-amber-50 hover:text-orange-500"
            to={`/Profile/${token?.userId}`}
          >
            Profile
          </Link>
        </div>

        <div className="flex flex-col items-start justify-center gap-px">
          <h1 className="text-orange-500 font-medium">Contact Us</h1>
          <p className="text-amber-50">Email: alialridaalnajjar@gmail.com</p>
          <p className="text-amber-50">Lebanon, Beirut</p>
          <div className="flex flex-col items-start justify-center gap-2 mt-2">
            <h1 className="text-orange-500 font-medium">Social Links</h1>
            <div className="flex flex-row items-center justify-center gap-2">
              <a href="https://github.com/alialridaalnajjar">
                <FaGithub
                  className="text-white hover:text-orange-500/40"
                  size={25}
                />
              </a>
              <a href="https://www.linkedin.com/in/ali-al-najjar-88a801324/">
                <FaLinkedin
                  className="text-white hover:text-orange-500/40"
                  size={25}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-row items-start justify-around gap-2 p-4 ">
        <div>
          <h1 className="text-amber-50 text-2xl font-bold">
            <span className="text-orange-500">Dev</span>Art
          </h1>
          <h1 className="text-amber-50 font-medium">Learn Fast, Learn Smart</h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-px">
          <div className="text-orange-500 font-medium">Quick Links</div>
          <Link className="text-amber-50 hover:text-orange-500" to="/">
            Home
          </Link>
          <Link
            className="text-amber-50 hover:text-orange-500"
            to="/Courses/All"
          >
            Courses
          </Link>
          <Link
            className="text-amber-50 hover:text-orange-500"
            to={`/Profile/${token?.userId}`}
          >
            Profile
          </Link>
        </div>

        <div className="flex flex-col items-start justify-center gap-px">
          <h1 className="text-orange-500 font-medium">Contact Us</h1>
          <p className="text-amber-50">Email: alialridaalnajjar@gmail.com</p>
          <p className="text-amber-50">Lebanon, Beirut</p>
          <div className="flex flex-col items-start justify-center gap-2 mt-2">
            <h1 className="text-orange-500 font-medium">Social Links</h1>
            <div className="flex flex-row items-center justify-center gap-2">
              <a href="https://github.com/alialridaalnajjar">
                <FaGithub
                  className="text-white hover:text-orange-500/40"
                  size={25}
                />
              </a>
              <a href="https://www.linkedin.com/in/ali-al-najjar-88a801324/">
                <FaLinkedin
                  className="text-white hover:text-orange-500/40"
                  size={25}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <h1 className="  text-orange-50 text-sm m-auto w-full text-center pb-5">
        © 2026 DevArt - All Rights Reserved.
      </h1>
    </div>
  );
}
