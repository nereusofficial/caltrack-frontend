import { useState } from "react";
import { signup } from "../../services/authService";
import type { SignupRequest } from "../../models/User";

export const useSignupViewModel = () => {
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
        name === "age" ||
        name === "height" ||
        name === "weight"
          ? Number(value)
          : value,
    }));
  };

  const handleSignup = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      const res = await signup(formData);

      console.log("SIGNUP SUCCESS:", res);

      // Optional: store token if backend returns one
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed.");
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
    handleSignup,
  };
};