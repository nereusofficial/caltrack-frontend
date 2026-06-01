import { useState } from "react";
import type { LoginRequest } from "../../models/User";

export const useLoginViewModel = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Backend integration later
      console.log("Login Data:", formData);

      // Example:
      // const response = await login(formData);

    } catch (err) {
      setError("Login failed.");
      console.error(err);
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