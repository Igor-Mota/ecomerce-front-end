import { useCallback } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { environment } from "@/data/environment";

export const FacebookSocialLogin = ({ className }) => {
  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  return <></>;
};
