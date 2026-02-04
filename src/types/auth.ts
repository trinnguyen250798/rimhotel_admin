export interface User {
  id: number;
  getAllPermissions: string[];
  email: string;
  name: string;
  avatar?: string;
  // Add other user properties as needed
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  status: boolean;
  message?: string;
}
