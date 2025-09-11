// router/guards.ts - Guards baseado no seu AuthStore
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useAuthStore } from '../Stores/authStore'

// Extend da interface RouteMeta para tipagem
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    requiresAdmin?: boolean
    title?: string
    permissions?: string[]
  }
}

export function setupAuthGuards(router: Router): void {
  // Guard principal - executado antes de cada navegação
  router.beforeEach(async (
    to: RouteLocationNormalized, 
    from: RouteLocationNormalized, 
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    
    // Verificar sessão apenas se necessário e ainda não autenticado
    if (!authStore.isAuthenticated) {
      console.log('🔍 Verificando sessão existente...')
      const hasValidSession = await authStore.checkSession()
      
      if (hasValidSession) {
        console.log('✅ Sessão válida encontrada')
      } else {
        console.log('❌ Nenhuma sessão válida encontrada')
      }
    }
    
    // Extrair meta informações da rota
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
    
    console.log('🧭 Navegação:', {
      to: to.name,
      from: from.name,
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user?.userName,
      requiresAuth,
      requiresGuest,
      requiresAdmin,
      canAttemptLogin: authStore.canAttemptLogin
    })

    // 1. Verificar se rota requer autenticação
    if (requiresAuth) {
      if (!authStore.isAuthenticated) {
        console.log('🔐 Usuário não autenticado, redirecionando para login')
        next({
          name: 'Login',
          query: { 
            redirect: to.fullPath,
            message: 'Faça Login'
          }
        })
        return
      }
      
      // 3. Verificar permissões específicas se definidas
      if (to.meta.permissions && to.meta.permissions.length > 0) {
        const hasPermission = checkUserPermissions(authStore.user, to.meta.permissions)
        
        if (!hasPermission) {
          console.log('🚫 Usuário sem permissões necessárias:', to.meta.permissions)
          next({ 
            name: 'Unauthorized',
            query: { 
              message: 'Você não tem as permissões necessárias para esta página'
            }
          })
          return
        }
      }
    }
    
    // 4. Redirecionar usuários logados das páginas de guest
    if (requiresGuest && authStore.isAuthenticated) {
      console.log('👤 Usuário já logado, redirecionando para tela principal')
      const redirectTo = (to.query.redirect as string) || '/Home'
      next(redirectTo)
      return
    }
    
    // 5. Verificar tentativas de login na página de login
    if (to.name === 'Login' && !authStore.canAttemptLogin) {
      console.log('🚨 Muitas tentativas de login, bloqueando acesso')
      next({
        name: 'LoginBlocked',
        query: {
          message: 'Muitas tentativas de login. Tente novamente mais tarde.'
        }
      })
      return
    }
    
    // 6. Definir título da página
    if (to.meta.title) {
      document.title = `${to.meta.title} - Sua App`
    }
    
    next()
  })

  // Guard para verificar sessão antes de resolver rota
  router.beforeResolve(async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    
    // Se é uma rota protegida e usuário está autenticado
    if (to.meta.requiresAuth && authStore.isAuthenticated) {
      try {
        // Verificar se a sessão ainda é válida
        const sessionTime = authStore.sessionTimeRemaining
        
        if (sessionTime <= 0) {
          console.log('⏰ Sessão expirou, fazendo logout')
          await authStore.logout()
          next({
            name: 'Login',
            query: {
              redirect: to.fullPath,
              message: 'Sua sessão expirou. Faça login novamente.'
            }
          })
          return
        }
        
        // Avisar se sessão está próxima do fim (últimos 30 minutos)
        const thirtyMinutes = 30 * 60 * 1000
        if (sessionTime < thirtyMinutes && sessionTime > 0) {
          console.log('⚠️ Sessão expira em breve:', Math.floor(sessionTime / 60000), 'minutos')
          // Aqui você pode mostrar um toast/notificação para o usuário
        }
        
      } catch (error) {
        console.error('❌ Erro na verificação da sessão:', error)
        // Em caso de erro, redirecionar para login por segurança
        next({
          name: 'Login',
          query: {
            redirect: to.fullPath,
            message: 'Erro de autenticação. Faça login novamente.'
          }
        })
        return
      }
    }
    
    next()
  })

  // Guard após navegação
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const authStore = useAuthStore()
    
    // Log da navegação
    console.log(`📍 Navegou de ${from.name?.toString() || 'Unknown'} para ${to.name?.toString() || 'Unknown'}`)
    
    // Scroll para o topo em mudanças de página
    if (to.name !== from.name) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    // Atualizar última atividade se logado
    if (authStore.isAuthenticated && to.meta.requiresAuth) {
      // Você pode atualizar o lastLoginTime ou criar um campo lastActivity
      // authStore.updateLastActivity()
    }
  })
}

// Função auxiliar para verificar role admin
function checkAdminRole(user: any): boolean {
  // Adapte conforme sua estrutura User
  // Exemplos possíveis:
  return user?.role === 'admin' || 
         user?.isAdmin === true || 
         user?.permissions?.includes('admin') ||
         false
}

// Função auxiliar para verificar permissões
function checkUserPermissions(user: any, requiredPermissions: string[]): boolean {
  if (!user || !user.permissions) return false
  
  // Verificar se usuário tem todas as permissões necessárias
  return requiredPermissions.every(permission => 
    user.permissions.includes(permission)
  )
}

// Composable para usar guards em componentes
export function useRouteGuards() {
  const authStore = useAuthStore()

  const canAccess = (routeName: string): boolean => {
    const protectedRoutes = ['Home']
    const adminRoutes = ['Admin']
    
    if (adminRoutes.includes(routeName)) {
      return authStore.isAuthenticated && checkAdminRole(authStore.user)
    }
    
    if (protectedRoutes.includes(routeName)) {
      return authStore.isAuthenticated
    }
    
    return true
  }

  const hasPermission = (permission: string): boolean => {
    if (!authStore.isAuthenticated || !authStore.user) return false
    return checkUserPermissions(authStore.user, [permission])
  }

  const getSessionInfo = () => {
    const remaining = authStore.sessionTimeRemaining
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    
    return {
      timeRemaining: remaining,
      formattedTime: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
      isExpiringSoon: remaining < 30 * 60 * 1000, // 30 minutos
      isValid: remaining > 0
    }
  }

  return {
    canAccess,
    hasPermission,
    getSessionInfo,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    userFullName: authStore.userFullName,
    canAttemptLogin: authStore.canAttemptLogin
  }
}

// Utilitário para definir meta de rotas
export const routeMeta = {
  requiresAuth: { requiresAuth: true },
  requiresGuest: { requiresGuest: true },
  requiresAdmin: { requiresAuth: true, requiresAdmin: true },
  withPermissions: (permissions: string[]) => ({ requiresAuth: true, permissions }),
  withTitle: (title: string) => ({ title }),
  public: {}
}