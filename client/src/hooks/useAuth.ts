import { useState } from "react";
import { authService } from "../services/auth.service";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login({
        email,
        password,
      });

      const token = response.data.token || response.data.data?.token;
      const user = response.data.data?.user || response.data.data;

      if (!token) {
        throw new Error("No token received from server");
      }

      if (!user || user.role !== "ADMIN") {
        throw new Error("Only Admin can login");
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      return user;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Login failed";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}
