import { createContext, useEffect } from "react";
import { refreshTokenFetcher, meFetcher } from "@/services/http/auth";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "@/store/slices/authSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const authInfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAuth = async () => {
    if (!authInfo.login) {
      const response = await refreshTokenFetcher();
      if (response.access_token) {
        window.localStorage.setItem("token", response.access_token);
        const user = await meFetcher();
        dispatch(
          logIn({
            token: response.access_token,
            user,
          })
        );
      }
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
