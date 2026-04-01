export interface User {
  ulid: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  role_id: number;
  avatar?: Avatar | null;
  hotel_id?: string | null;
}
export interface Avatar {
    thumb: string;
    small: string;
    medium: string;
    large: string;
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
