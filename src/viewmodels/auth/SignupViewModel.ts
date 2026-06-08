import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { signup, googleAuth } from "../../services/authService";
import type { SignupRequest } from "../../models/User";

export const useSignupViewModel = (onGoogleSuccess?: () => void) => {
  const [formData, setFormData] = useState<SignupRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: 0,
    gender: "Male",
    height: 0,
    weight: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "age" || name === "height" || name === "weight"
          ? Number(value)
          : value,
    }));
  };

  const validate = (): string => {
    if (!formData.firstName.trim()) return "First name is required.";
    if (!formData.lastName.trim()) return "Last name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Enter a valid email address.";
    if (formData.password.length < 8)
      return "Access key must be at least 8 characters.";
    if (!/[A-Z]/.test(formData.password))
      return "Access key must contain at least one uppercase letter.";
    if (!/[0-9]/.test(formData.password))
      return "Access key must contain at least one number.";
    if (formData.age <= 0) return "Enter a valid age.";
    if (formData.height <= 0) return "Enter a valid height.";
    if (formData.weight <= 0) return "Enter a valid weight.";
    return "";
  };

  const triggerError = (msg: string) => {
    setError("");
    setTimeout(() => setError(msg), 10);
  };

  const handleSignup = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const validationError = validate();
      if (validationError) {
        triggerError(validationError);
        return false;
      }

      await signup(formData);
      return true;
    } catch (err: any) {
      triggerError(err.response?.data?.message || "Signup failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError("");
        await googleAuth(tokenResponse.access_token, "signup");
        onGoogleSuccess?.();
      } catch (err: any) {
        triggerError(err.response?.data?.message || "Google signup failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => triggerError("Google sign-up was cancelled or failed."),
  });

  return { formData, loading, error, handleChange, handleSignup, handleGoogleSignup };
};