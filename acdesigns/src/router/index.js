import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Profile from '../views/Profile/Profile.vue'
import ProfileEdit from '../views/Profile/ProfileEdit.vue'
import Favorites from '../views/Profile/Favorites.vue'
import UserDesigns from '../views/Profile/UserDesigns.vue'
import Design from '../views/Design/Design.vue'
import DesignCreate from '../views/Design/DesignCreate.vue'
import DesignEdit from '../views/Design/DesignEdit.vue'

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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: ProfileEdit
  },
  {
    path: '/favorites/',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/user-designs/',
    name: 'UserDesigns',
    component: UserDesigns
  },
  {
    path: '/design/',
    name: 'Design',
    component: Design
  },
  {
    path: '/design-create',
    name: 'DesignCreate',
    component: DesignCreate
  },
  {
    path: '/design-edit/',
    name: 'DesignEdit',
    component: DesignEdit
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
