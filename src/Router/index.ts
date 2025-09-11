import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setupAuthGuards, routeMeta } from './guard'

const routes: Array<RouteRecordRaw> = [
  {
  path: '/',
  name: 'Home',
  component: () => import('../Views/MainPages/Home.vue'), 
  meta: {
    ...routeMeta.requiresAuth, 
    ...routeMeta.withTitle('Home') 
  }

  },

  // Rotas de autenticação (só para usuários deslogados)
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../Views/Login.vue'),
    meta: {
      ...routeMeta.requiresGuest,
      ...routeMeta.withTitle('Entrar')
    }
  },
   {
    path: '/Register',
    name: 'Register',
    component: () => import('../Views/Register.vue'),
    meta: {
      ...routeMeta.withTitle('Cadastrar')
    }
  },
 
//  Página para quando tentativas de login esgotam
  {
    path: '/login-blocked',
    name: 'LoginBlocked',
    component: () => import('../Views/LoginBlocked.vue'),
    meta: {
      ...routeMeta.withTitle('Acesso Temporariamente Bloqueado')
    }
  },

  // Rotas protegidas (requer autenticação)
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/DashboardView.vue'),
  //   meta: {
  //     ...routeMeta.requiresAuth,
  //     ...routeMeta.withTitle('Dashboard')
  //   }
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: () => import('@/views/ProfileView.vue'),
  //   meta: {
  //     ...routeMeta.requiresAuth,
  //     ...routeMeta.withTitle('Meu Perfil')
  //   }
  // },

  // Páginas de erro
  // {
  //   path: '/unauthorized',
  //   name: 'Unauthorized',
  //   component: () => import('@/views/error/UnauthorizedView.vue'),
  //   meta: {
  //     ...routeMeta.withTitle('Acesso Negado')
  //   }
  // },
  // {
  //   path: '/not-found',
  //   name: 'NotFound',
  //   component: () => import('#'),
  //   meta: {
  //     ...routeMeta.withTitle('Página Não Encontrada')
  //   }
  // },

  // Catch-all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Configurar os guards
setupAuthGuards(router)

// Log de navegação em desenvolvimento
if (import.meta.env.DEV) {
  router.beforeEach((to, from, next) => {
    console.group('🧭 Router Navigation')
    console.log('From:', from.fullPath)
    console.log('To:', to.fullPath)
    console.log('Meta:', to.meta)
    console.groupEnd()
    next()
  })
}

export default router