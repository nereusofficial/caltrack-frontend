import { useState } from "react";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import type { LoginRequest } from "../../models/User";

export const useLoginViewModel = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const res = await loginService(formData);

      if (res.token) {
        login(res.token); // ← sets token + isAuthenticated
      } else {
        // No token but success — still mark as authenticated
        login("authenticated");
      }

      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleLogin };
};