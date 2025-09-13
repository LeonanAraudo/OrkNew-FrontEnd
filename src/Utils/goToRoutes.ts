import type { Router } from 'vue-router';

export function goToHome(router: Router) {
    router.push('/Home')
}

export function goToRegister(router: Router) {
  router.push('/Register')
}

export function goToLogin(router: Router) {
  router.push('/Login')
}
