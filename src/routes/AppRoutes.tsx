import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginView from "../views/auth/LoginView";
import SignupView from "../views/auth/SignupView";
import ForgotPasswordView from "../views/auth/ForgotPasswordView";
import VerifySuccess from "../views/auth/VerifySuccess";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/verify-success" element={<VerifySuccess />} />

        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;