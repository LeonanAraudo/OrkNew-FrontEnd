
export interface User {
  email: string;
  password: string;
  userName: string;
}

export interface AuthData {
  user: User;
  access: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginCredencial{
    username:string,
    password: string,
}