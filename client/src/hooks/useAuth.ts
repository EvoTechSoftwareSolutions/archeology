import { useState } from "react";
import { authService } from "../services/auth.service";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const response = await authService.login({
        email,
        password,
      });

      const token = response.data.data.token;

      const user = response.data.data.user;

      if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
        throw new Error("Only Admin can login");
      }

      localStorage.setItem("adminToken", token);

      localStorage.setItem("adminUser", JSON.stringify(user));

      return user;
    } catch (error: any) {
      setError(error.message);

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
