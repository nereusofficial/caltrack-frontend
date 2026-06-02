import { useState } from "react";
import { login } from "../../services/authService";
import type { LoginRequest } from "../../models/User";

export const useLoginViewModel = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const res = await login(formData);

      console.log("LOGIN SUCCESS:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleLogin,
  };
};