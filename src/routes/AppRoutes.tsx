import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageTransition from "../components/auth/PageTransition";
import LoginView from "../views/auth/LoginView";
import SignupView from "../views/auth/SignupView";
import ForgotPasswordView from "../views/auth/ForgotPasswordView";
import VerifySuccessView from "../views/auth/VerifySuccessView";
import DashboardView from "../views/auth/DashboardView";
import ResetPasswordView from "../views/auth/ResetPasswordView";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GuestRoute from "../components/auth/GuestRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Guest only — redirect to dashboard if logged in */}
          <Route path="/login" element={<GuestRoute><LoginView /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><SignupView /></GuestRoute>} />
          <Route path="/forgot-password" element={<GuestRoute><ForgotPasswordView /></GuestRoute>} />
          <Route path="/reset-password" element={<GuestRoute><ResetPasswordView /></GuestRoute>} />

          {/* Public */}
          <Route path="/verify-success" element={<VerifySuccessView />} />

          {/* Protected — redirect to login if not logged in */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
};

export default AppRoutes;