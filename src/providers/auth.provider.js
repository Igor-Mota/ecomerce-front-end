import { createContext, useContext, useEffect, useState } from "react";
import { refreshTokenFetcher, meFetcher } from "@/services/http/auth";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "@/store/slices/authSlice";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authProviderLoading, setAuthProviderLoading] = useState(true);
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
    setAuthProviderLoading(false);
  };

  useEffect(() => {
    isAuth();
  }, []);

  return <AuthContext.Provider value={{ authProviderLoading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const { authProviderLoading } = useContext(AuthContext);
  return { authProviderLoading };
};
