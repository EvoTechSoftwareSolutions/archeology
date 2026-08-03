export type UserRole =
  | "USER"
  | "ADMIN"
  | "SUPERADMIN";


export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;

  initials?: string;
  initialsColor?: string;
}


export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  department: string;
  role: UserRole;
}