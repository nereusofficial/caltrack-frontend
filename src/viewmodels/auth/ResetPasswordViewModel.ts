import { useState } from "react";
import { resetPassword } from "../../services/authService";

export const useResetPasswordViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changePassword = async (
    token: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      await resetPassword(token, password);

      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Password reset failed."
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    changePassword,
  };
};