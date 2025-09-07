import { createMemoryHistory, createRouter, type Router, type RouteRecordRaw } from 'vue-router'
import Home from '../Views/MainPages/Home.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', component: Home}
]

const router: Router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
