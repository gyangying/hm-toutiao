import VueRouter from 'vue-router'
import Vue from 'vue'
import auth from '@/utils/auth'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.path !== '/login' && !auth.getUser().token) return next('login')
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  next()
})

export default router
