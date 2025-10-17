import axios from "axios";
import type { ServiceResponse, AuthData, LoginCredencial, User } from "../Types/user";

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log('API URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);

export const authService = {
    async Login(credentials: LoginCredencial): Promise<ServiceResponse<AuthData>> {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/token/`, {
                username: credentials.username,
                password: credentials.password
            })
            return {
                success: true,
                data: response.data
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro no login'
            }
        }
    },
     async getUser(): Promise<ServiceResponse<User>> {
        try {
            const token = localStorage.getItem('access'); 
            if (!token) {
                return {
                    success: false,
                    error: 'Token não encontrado'
                }
            }
            const response = await axios.get(`${API_BASE_URL}/v1/api/users/me/`, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });
            return {
                success: true,
                data: response.data
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao buscar usuário'
            }
        }
    },
    async logout() {
        try {
            await axios.post(``)
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error.message
            }
        }
    },

    // async validateToken(token: string) {
    //     try {
    //             await axios.get(`${API_BASE_URL}/v1/api/users/`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error: any) {
    //         return {
    //             success: false,
    //             error: error.message
    //         }
    //     }
    // },

    async Register(credentials: { username: string; email: string; password: string }){
        try{
            const response = await axios.post(`${API_BASE_URL}/v1/api/users/`,{
                username: credentials.username,
                email: credentials.email,
                password: credentials.password
            })
            return{
                success: true,
                data: response.data
            }
        }catch(error: any){
            return{
                success: false,
                error: error.response?.data?.message || 'Erro no cadastro'
            }
        }
    },
    async refreshToken() {
        try {
            const response = await axios.get(``)
            return {
                success: true,
                token: response.data.token
            }
        }catch(error: any){
            return { success: false}
        }
    }
}