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

  const validate = (): string => {
    if (!formData.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Enter a valid email address.";
    if (!formData.password) return "Access key is required.";
    if (formData.password.length < 8)
      return "Access key must be at least 8 characters.";
    return "";
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return false;
      }

      const res = await loginService(formData);

      if (res.token) {
        login(res.token);
      } else {
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