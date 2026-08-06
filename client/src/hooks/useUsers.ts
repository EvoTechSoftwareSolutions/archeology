import { useEffect, useState, useCallback } from "react";
import { userService } from "../services/user.service";
import type { User, CreateUserPayload } from "../types/user.types";

export type UpdateUserPayload = Partial<Omit<CreateUserPayload, "password">>;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load users";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const executeMutation = async (action: () => Promise<unknown>) => {
    setError(null);
    try {
      await action();
      await loadUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Action failed";
      setError(message);
      throw err;
    }
  };

  const createUser = (payload: CreateUserPayload) =>
    executeMutation(() => userService.createUser(payload));

  const updateUser = (id: number, payload: UpdateUserPayload) =>
    executeMutation(() => userService.updateUser(id, payload));

  const deleteUser = (id: number) =>
    executeMutation(() => userService.deleteUser(id));

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

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