import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageTransition from "../components/auth/PageTransition";
import LoginView from "../views/auth/LoginView";
import SignupView from "../views/auth/SignupView";
import ForgotPasswordView from "../views/auth/ForgotPasswordView";
import VerifySuccessView from "../views/auth/VerifySuccessView";
import DashboardView from "../views/auth/DashboardView";
import ResetPasswordView from "../views/auth/ResetPasswordView";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/reset-password" element={<ResetPasswordView />} />
          <Route path="/verify-success" element={<VerifySuccessView />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
};

export default AppRoutes;