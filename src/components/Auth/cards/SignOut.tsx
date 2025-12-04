import { useNavigate } from "react-router-dom";
import useAuthCookies from "../../../utils/UseAuth";
export default function SignOut() {
  const { removeToken } = useAuthCookies();
  const navigate = useNavigate();
  const handleSignOut = () => {
    removeToken();

    navigate("/", { replace: true });
  };

  return (
    <div
      className="
        cursor-pointer 
        bg-red-600 
        hover:bg-red-700 
        text-white 
        font-semibold 
        py-2 
        px-4 
        rounded-lg 
        shadow-md 
        transition duration-150 ease-in-out
        w-full sm:w-auto text-center
      "
      onClick={handleSignOut}
    >
      SIGN OUT
    </div>
  );
}
