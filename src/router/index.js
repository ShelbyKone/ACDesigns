import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import User from '../views/User/User.vue'
import UserEdit from '../views/User/UserEdit.vue'
import Favorites from '../views/User/Favorites.vue'
import Designs from '../views/User/Designs.vue'
import About from '../views/User/About.vue'
import Design from '../views/Design/Design.vue'
import DesignCreate from '../views/Design/DesignCreate.vue'
import DesignEdit from '../views/Design/DesignEdit.vue'
import * as auth from '../services/UserService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    children: [
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: Favorites
      },
      {
        path: 'designs',
        name: 'Designs',
        component: Designs
      },
    ]
  },
  {
    path: '/user/:id/edit',
    name: 'UserEdit',
    component: UserEdit,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn() && to.params.id == auth.getUserId()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/design/:id',
    name: 'Design',
    component: Design
  },
  {
    path: '/design-create',
    name: 'DesignCreate',
    component: DesignCreate,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/design/:id/edit',
    name: 'DesignEdit',
    component: DesignEdit,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '*',
    redirect: '/home',
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})

export default router
