import { useState } from "react";
import { resetPassword } from "../../services/authService";

export const useResetPasswordViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = (password: string, confirm: string): string => {
    if (!password) return "Access key is required.";
    if (password.length < 8) return "Access key must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Access key must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password)) return "Access key must contain at least one number.";
    if (password !== confirm) return "Access keys do not match. Re-enter.";
    return "";
  };

  const triggerError = (msg: string) => {
    setError("");
    setTimeout(() => setError(msg), 10);
  };

  const changePassword = async (
    token: string,
    password: string,
    confirm: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const validationError = validate(password, confirm);
      if (validationError) {
        triggerError(validationError);
        return false;
      }

      await resetPassword(token, password);
      return true;
    } catch (err: any) {
      triggerError(err.response?.data?.message || "Password reset failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, changePassword };
};