import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { login as loginService, googleAuth } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import type { LoginRequest } from "../../models/User";

export const useLoginViewModel = (onGoogleSuccess?: () => void) => {
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

  const triggerError = (msg: string) => {
    setError("");
    setTimeout(() => setError(msg), 10);
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const validationError = validate();
      if (validationError) {
        triggerError(validationError);
        return false;
      }

      const res = await loginService(formData);
      login(res.token ?? "authenticated");
      return true;
    } catch (err: any) {
      triggerError(err.response?.data?.message || "Login failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError("");
        const res = await googleAuth(tokenResponse.access_token, "login");
        onGoogleSuccess?.();                    // show notification first
        setTimeout(() => {
          login(res.token ?? "authenticated");  // login after notification starts
        }, 2400);                               // matches the 2000ms auth stage + 400ms fade
      } catch (err: any) {
        triggerError(err.response?.data?.message || "Google login failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => triggerError("Google sign-in was cancelled or failed."),
  });

  return { formData, loading, error, handleChange, handleLogin, handleGoogleLogin };
};