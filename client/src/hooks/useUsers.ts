import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import type { User } from "../types/user.types";
import type { CreateUserPayload } from "../types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await userService.getUsers();

      setUsers(data);
    } catch (error: any) {
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

 const createUser = async (data:CreateUserPayload)=>{
    await userService.createUser(data);

    await loadUsers();
  };

  const updateUser = async (id: number, data: any) => {
    await userService.updateUser(id, data);

    await loadUsers();
  };

  const deleteUser = async (id: number) => {
    await userService.deleteUser(id);

    await loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,

    reload: loadUsers,

    createUser,
    updateUser,
    deleteUser,
  };
}
