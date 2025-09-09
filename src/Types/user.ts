
export interface User {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginCredencial{
    email:string,
    password: string
}