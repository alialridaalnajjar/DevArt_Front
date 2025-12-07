import { useCookies } from "react-cookie";
import type { DecodedToken } from "./Types";

export default function useAuthCookies() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const saveToken = (newToken: string) => {
    setCookie("token", newToken, { path: "/", maxAge: 5000 });
  };
  const getToken = (): string => {
    return cookies.token;
  };
  const removeToken = () => {
    removeCookie("token", { path: "/" });
  };

  const getDecodedToken = (): DecodedToken | null => {
    const token = getToken();
    if (!token) return null;
    
    try {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const decoded = JSON.parse(decodedPayload) as DecodedToken;
      
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        removeToken();
        return null;
      }
      
      return decoded;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };
  return { saveToken, getToken, removeToken, isAuthenticated: !!cookies.token, getDecodedToken };
}
