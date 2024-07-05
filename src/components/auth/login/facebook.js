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

  return (
    <LoginSocialFacebook
      className={`${className}`}
      appId={"2200055216993989"}
      fieldsProfile={"name,picture,email"}
      onLoginStart={onLoginStart}
      onLogoutSuccess={onLogoutSuccess}
      redirect_uri={environment.BASE_URL}
      onResolve={({ provider, data }) => {
        console.log(provider);
        console.log(data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
};
