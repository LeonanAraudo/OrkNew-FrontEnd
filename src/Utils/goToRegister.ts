import type { Router, RouteLocationNormalized } from 'vue-router';

export function goToRegister(
  router: Router,
  route: RouteLocationNormalized
) {
  router.push({
    path: '/Register',
    query: {
      redirect: route.query.redirect?.toString() || '/',
      message: "Cadastre-se"
    }
  });
}
