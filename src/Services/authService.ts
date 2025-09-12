import axios from "axios";
import type { ServiceResponse, AuthData, LoginCredencial, User } from "../Types/user";

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log('API URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);

export const authService = {
    async Login(credentials: LoginCredencial): Promise<ServiceResponse<AuthData>> {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/token`, {
                email: credentials.email,
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
    async validateToken(token: string) {
        try {
            const response = await axios.get(``, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return {
                success: true,
                user: response.data.user
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.message
            }
        }
    },
    async Register(credentials: User){
        try{
            const response = await axios.post(`${API_BASE_URL}/v1/api/users/`,{
                username: credentials.userName,
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