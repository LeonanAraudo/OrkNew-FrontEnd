// import { ref, computed } from "vue";
// import { authService } from "../Services/authService";
// import { useRouter } from "vue-router";
// import type { LoginCredencial } from "../Types/user";

// export function useAuth() {
//     const router = useRouter()

//     const user = ref(null)
//     const error = ref('')
//     const loading = ref(false)

//     const isAuthenticated = computed(() => !!user.value) //Vai checar se o usuário está logado

//     async function login(credentials: LoginCredencial) {
//         try {
//             loading.value = true
//             error.value = ''

//             const result = await authService.Login(credentials)
//             if (result.success) {
//                 user.value = result.data?.user

//                 localStorage.setItem('auth_token', result.data.token)
//                 localStorage.setItem('user', JSON.stringify(result.data?.user))

//                 await router.push('/Home')
//                 return { success: true }
//             } else {
//                 error.value = result.error
//                 return { success: false, error: error.value }
//             }
//         } catch (error) {
//             error.value = "Erro inesperado. Tente novamente"
//             return { success: false, error: error.value }
//         } finally {
//             loading.value = false
//         }
//     }
// }
// // const result = {
// //   success: true,
// //   data: {
// //     user: {
// //       id: 123,
// //       name: "João Silva",
// //       email: "joao@email.com",
// //       role: "user",
// //       avatar: "https://...",
// //       createdAt: "2024-01-15"
// //     },
// //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
// //   }
// // }