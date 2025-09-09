import axios from "axios";
import type { ServiceResponse, AuthData, LoginCredencial } from "../Types/user";

export const authService = {
    async Login(credentials: LoginCredencial): Promise<ServiceResponse<AuthData>> {
        try {
            const response = await axios.post(``, {
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