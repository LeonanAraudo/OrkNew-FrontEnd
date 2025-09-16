import { defineStore } from "pinia";
import type { User, AuthData, ServiceResponse, LoginCredencial } from "../Types/user";
import { authService } from "../Services/authService";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isLoading: false,
    loginAttempts: 0,
    lastLoginTime: null as number | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userFullName: (state) => state.user?.username || "",
    canAttemptLogin: (state) => state.loginAttempts < 5,

    sessionTimeRemaining: (state) => {
      if (!state.lastLoginTime) return 0;
      const elapsed = Date.now() - state.lastLoginTime;
      const sessionTimeout = 8 * 60 * 60 * 1000; // 8 horas
      return Math.max(0, sessionTimeout - elapsed);
    },
  },

  actions: {
    async login(credentials: LoginCredencial) {
      this.isLoading = true;
      try {
        const result: ServiceResponse<AuthData> = await authService.Login(credentials);
        if (result.success && result.data) {
          this.token = result.data.access;
          this.loginAttempts = 0;
          this.lastLoginTime = Date.now();
          this.persistSession();
          await this.getUsers();
          return { success: true };
        } else {
          this.loginAttempts++;
          return { success: false, error: result.error };
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getUsers(){
    this.isLoading = true
      try{
        const result: ServiceResponse<User> = await authService.getUser()
        if(result.success && result.data){
          this.user = result.data
          this.persistUserData()
          return{
            success: true,
            data: result.data
          }
        }else{
          if (result.error === 'Token não encontrado' || result.error?.includes('401')) {
            this.clearSession();
          }
          return{
            success: false,
            error: result.error || 'Erro ao carregar dados do usuário'
          }
        }
      }catch(error: any){
        return {
           success: false,
           error: 'Error inesperado ao carregar usuário'
          }
      }finally{
        this.isLoading = false
      }
    },
    async logout() {
      try {
        await authService.logout();
      } finally {
        this.clearSession();
      }
    },
 
async checkSession() {
      const lastLogin = localStorage.getItem("last_login");
      const token = localStorage.getItem("access");
      const userData = localStorage.getItem("user_data")
      if (token) {
        if (lastLogin) this.lastLoginTime = Number(lastLogin);
        this.token = token;
        if(userData){
          try{
            this.user = JSON.parse(userData)
          }catch(error){
            console.log('Erro no parse dos dados do user',error)
          }
        }
        const userResult = await this.getUsers()
        return userResult.success
      }
      this.clearSession();
      return false;
    },

    persistUserData() {
      if (this.user) {
        localStorage.setItem("user_data", JSON.stringify(this.user));
      }
    },
    persistSession() {
      if (this.token) localStorage.setItem("access", this.token);
      if (this.lastLoginTime) localStorage.setItem("last_login", this.lastLoginTime.toString());
    },

    clearSession() {
      this.user= null;
      this.token = null;
      this.lastLoginTime = null;

      localStorage.removeItem("user_data");
      localStorage.removeItem("access");
      localStorage.removeItem("last_login");
    },

  },
});
