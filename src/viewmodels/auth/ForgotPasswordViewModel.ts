import { useState } from "react";
import { forgotPassword } from "../../services/authService";

export const useForgotPasswordViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendResetLink = async (
    email: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      await forgotPassword(email);

      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to send reset link."
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendResetLink,
  };
};