import { useCookies } from "react-cookie";

export default function useAuthCookies() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const saveToken = (newToken: string) => {
    setCookie("token", newToken, { path: "/", maxAge: 5000 });
  };
  const getToken = (): string | undefined => {
    return cookies.token;
  };
  const removeToken = () => {
    removeCookie("token", { path: "/" });
  };
  return { saveToken, getToken, removeToken, isAuthenticated: !!cookies.token };
}
