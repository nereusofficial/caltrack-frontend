import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isRedirecting } = useAuth();

  if (isAuthenticated && !isRedirecting) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;