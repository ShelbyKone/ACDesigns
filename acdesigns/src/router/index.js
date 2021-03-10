import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import Profile from '../views/Profile/Profile.vue'
import ProfileEdit from '../views/Profile/ProfileEdit.vue'
import Favorites from '../views/Profile/Favorites.vue'
import UserDesigns from '../views/Profile/UserDesigns.vue'
import Design from '../views/Design/Design.vue'
import DesignCreate from '../views/Design/DesignCreate.vue'
import DesignEdit from '../views/Design/DesignEdit.vue'
import * as auth from '../services/AuthService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile-edit/:id',
    name: 'ProfileEdit',
    component: ProfileEdit,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/favorites/:id',
    name: 'Favorites',
    component: Favorites,
  },
  {
    path: '/user-designs/:id',
    name: 'UserDesigns',
    component: UserDesigns
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
    path: '/design-edit/:id',
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
    redirect: '/',
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
