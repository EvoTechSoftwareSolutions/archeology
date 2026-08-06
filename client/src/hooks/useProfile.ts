import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import type { User } from "../types/user.types";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const data = await authService.getCurrentUser();

      setUser(data);
    } catch (error) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    user,
    loading,
    error,
  };
};
