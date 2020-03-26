import Vue from 'vue'
import VueRouter from 'vue-router'
import Entry from '../views/Entry.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'entry',
    component: Entry
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user_profile',
    name: 'user_profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/contact/:id',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/create_contact',
    name: 'create_contact',
    component: () => import('../views/CreateContact.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/']
  const authRequired = !publicRoutes.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (!loggedIn && authRequired) {
    next('/')
  } else {
    next()
  }
})

export default router
