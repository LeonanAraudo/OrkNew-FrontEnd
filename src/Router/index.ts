import { createMemoryHistory, createRouter, type Router, type RouteRecordRaw } from 'vue-router';
import Home from '../Views/MainPages/Home.vue';
import Login  from '../Views/Login.vue';

const routes: RouteRecordRaw[] = [
  {path: '/', component: Home},
  {path: '/Login', component: Login}
]

const router: Router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
