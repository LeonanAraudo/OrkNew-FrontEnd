import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setupAuthGuards, routeMeta } from './guard'

const routes: Array<RouteRecordRaw> = [
  // Rota raiz - redireciona baseado na autenticação


  // Páginas públicas (não requer autenticação)
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../Views/Login.vue'),
    meta: {
      ...routeMeta.requiresGuest,
      ...routeMeta.withTitle('Entrar')
    },
    beforeEnter: (to, _from, next) => {
      if (!to.query.message) {
        next({
          path: to.path,
          query: {
            ...to.query,
            message: 'Faça login',
            redirect: to.query.redirect?.toString() || '/Home',
          }
        })
      } else {
        next()
      }
    }
  },

  {
    path: '/Register',
    name: 'Register',
    component: () => import('../Views/Register.vue'),
    meta: {
      ...routeMeta.requiresGuest, 
      ...routeMeta.withTitle('Cadastrar')
    },
    beforeEnter: (to, _from, next) => {
      if (!to.query.message) {
        next({
          path: to.path,
          query: {
            ...to.query,
            message: 'Cadastre-se',
            redirect: to.query.redirect?.toString() || '/Login',
          }
        })
      } else {
        next()
      }
    }
  },

  // Página para quando tentativas de login esgotam
  {
    path: '/login-blocked',
    name: 'LoginBlocked',
    component: () => import('../Views/LoginBlocked.vue'),
    meta: {
      ...routeMeta.withTitle('Acesso Temporariamente Bloqueado')
    }
  },

  // Rotas protegidas (requer autenticação)
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../Views/MainPages/Home.vue'), 
    meta: {
      ...routeMeta.requiresAuth, 
      ...routeMeta.withTitle('Home')
      
    },
     beforeEnter: (to, _from, next) => {
      if (!to.query.message) {
        next({
          path: to.path,
          query: {
            ...to.query,
            message: 'Bem Vindo',
            redirect: to.query.redirect?.toString() || '/Login',
          }
        })
      } else {
        next()
      }
    }
  },

  // Páginas de erro
  // {
  //   path: '/unauthorized',
  //   name: 'Unauthorized',
  //   component: () => import('../Views/error/UnauthorizedView.vue'), // Você precisa criar este componente
  //   meta: {
  //     ...routeMeta.withTitle('Acesso Negado')
  //   }
  // },
  // {
  //   path: '/not-found',
  //   name: 'NotFound',
  //   component: () => import('../Views/error/NotFoundView.vue'), // Você precisa criar este componente
  //   meta: {
  //     ...routeMeta.withTitle('Página Não Encontrada')
  //   }
  // },

  // Catch-all - deve ser a última rota
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
    console.group('🧭 Router Navigation Debug')
    console.log('From:', from.fullPath)
    console.log('To:', to.fullPath)
    console.log('Meta:', to.meta)
    console.log('Query:', to.query)
    console.groupEnd()
    next()
  })
}

export default router