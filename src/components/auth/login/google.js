import { useCallback, useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { environment } from "@/data/environment";

function GoogleSocialLogin({ onLogin, onerror }) {
  let _window = null;

  useEffect(() => {
    if (window && !document.getElementById("google-login")) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.id = "google-login";
      document.body.appendChild(s);

      s.onload = () => {
        _window = window;
        window.google.accounts.id.initialize({
          client_id: environment.GOOGLE_CLIENT_ID,
          callback: (data) => {
            if (onLogin) onLogin(data);
          },
          onerror: (error) => {
            if (onerror) onerror(error);
          },
        });
      };
      s.onerror = () => {
        throw new Error("Google sdk is not found");
      };
    } else {
      _window = window;
      window.google.accounts.id.initialize({
        client_id: environment.GOOGLE_CLIENT_ID,
      });
    }
  }, []);
  const onLoginPopupPermissions = async () => {
    await Notification.requestPermission((call) => console.log(call));
  };
  const onLoginStart = useCallback(() => {
    onLoginPopupPermissions();
    _window.google.accounts.id.prompt();
  }, []);

  return <GoogleLoginButton onClick={onLoginStart} />;
}

export default GoogleSocialLogin;
