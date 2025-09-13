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
    userFullName: (state) => state.user?.userName || "",
    canAttemptLogin: (state) => state.loginAttempts < 5,

    sessionTimeRemaining: (state) => {
      if (!state.lastLoginTime) return 0;
      const elapsed = Date.now() - state.lastLoginTime;
      const sessionTimeout = 8 * 60 * 60 * 1000; // 8 horas
      return Math.max(0, sessionTimeout - elapsed);
    },
  },

  actions: {
    // async login(credentials: LoginCredencial) {
    //   this.isLoading = true;
    //   try {
    //     const result: ServiceResponse<AuthData> = await authService.Login(credentials);
    //     if (result.success && result.data) {
    //       this.token = result.data.token;
    //       this.loginAttempts = 0;
    //       this.lastLoginTime = Date.now();
    //       this.persistSession();
    //       return { success: true };
    //     } else {
    //       this.loginAttempts++;
    //       return { success: false, error: result.error };
    //     }
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async logout() {
      try {
        await authService.logout();
      } finally {
        this.clearSession();
      }
    },
    async login(credentials: LoginCredencial) {
      this.isLoading = true;
      try {
        console.log('🔐 AuthStore - Iniciando login...');
        const result: ServiceResponse<AuthData> = await authService.Login(credentials);

        if (result.success && result.data) {
          console.log('🔐 AuthStore - Dados recebidos:', result.data);

          this.token = result.data.access;
          this.loginAttempts = 0;
          this.lastLoginTime = Date.now();

          console.log('🔐 AuthStore - Estado ANTES de persistir:', {
            token: this.token?.substring(0, 20) + '...',
            isAuthenticated: this.isAuthenticated,
            user: this.user
          });

          this.persistSession();

          console.log('🔐 AuthStore - Estado APÓS persistir:', {
            isAuthenticated: this.isAuthenticated,
            localStorage: !!localStorage.getItem("access")
          });

          return { success: true };
        }
      }catch(error){

      }
},

async checkSession() {
      console.log('🔍 AuthStore - INÍCIO checkSession');
      console.log('🔍 Estado atual:', {
        token: this.token?.substring(0, 10) + '...',
        isAuthenticated: this.isAuthenticated
      });

      const token = localStorage.getItem("access");
      console.log('🔍 Token no localStorage:', !!token);

      if (token) {
        this.token = token;

        console.log('🔍 AuthStore - APÓS restaurar:', {
          isAuthenticated: this.isAuthenticated,
          hasUser: !!this.user
        });

        return true;
      }

      this.clearSession();
      return false;
    },

      persistSession() {
      if (this.token) localStorage.setItem("access", this.token);
      if (this.user) localStorage.setItem("auth_user", JSON.stringify(this.user));
      if (this.lastLoginTime) localStorage.setItem("last_login", this.lastLoginTime.toString());
    },

    clearSession() {
      this.user = null;
      this.token = null;
      this.lastLoginTime = null;

      localStorage.removeItem("access");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("last_login");
    },

    updateUser(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData };
        localStorage.setItem("auth_user", JSON.stringify(this.user));
      }
    },
  },
});
