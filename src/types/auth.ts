export interface User {
  ulid: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  role_id: number;
  avatar?: string;
  // Add other user properties as needed
}

export interface LoginCredentials {
  email: string;
  password?: string;
  remember_me?: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  status?: boolean;
  message?: string;
}
