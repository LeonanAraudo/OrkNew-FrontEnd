
export interface User {
  email: string;
  password: string;
  username: string;
  img_profile: string,
  img_background: string,
  qtd_seguindo: number,
  qtd_seguidores: number,
  qtd_publicacao: number
}
export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
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
    email:string,
    password: string,
}