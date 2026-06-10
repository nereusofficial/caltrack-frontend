import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

declare global {
  interface Window { FB: any; fbAsyncInit: any; }
}

window.fbAsyncInit = function () {
  window.FB.init({
    appId: import.meta.env.VITE_FACEBOOK_APP_ID,
    cookie: true,
    xfbml: true,
    version: "v19.0",
  });
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);