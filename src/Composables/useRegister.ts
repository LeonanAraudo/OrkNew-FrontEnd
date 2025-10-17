import { readonly, ref } from "vue";
import { authService } from "../Services/authService";
import type { RegisterDTO } from "../Types/user";

export const useRegister = () => {
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const isSuccess = ref(false)

    const register = async (userData: RegisterDTO) => {
        isLoading.value = true
        error.value = null
        isSuccess.value = true
        try {
            const response = await authService.Register(userData)
            if (response.success) {
                isSuccess.value = false
                return response
            } else {
                error.value = response.error || "Erro no cadastro"
                return response
            }
        } catch (err: any) {
            error.value = err.message || 'Erro inesperado'
            return {
                success: false,
                error: error.value
            }
        } finally {
            isLoading.value = false
        }
    }
    const resetState = () => {
        error.value = null
        isSuccess.value = false
        isLoading.value = false
    }
    return{
        register,
        isLoading: readonly(isLoading),
        isSuccess: readonly(isSuccess),
        error: readonly(error),
        resetState
    }
}