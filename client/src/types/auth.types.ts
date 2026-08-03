export interface LoginRequest {
  email: string;

  password: string;
}

export interface LoginUser {
  id: number;

  name: string;

  email: string;

  role: string;

  department: string;
}

export interface LoginResponse {
  token: string;

  user: LoginUser;
}
