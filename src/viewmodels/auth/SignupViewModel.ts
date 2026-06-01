import { useState } from "react";
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      // Backend integration later
      console.log("Signup Data:", formData);

      // Example:
      // const response = await signup(formData);

    } catch (err) {
      setError("Signup failed.");
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
    handleSignup,
  };
};