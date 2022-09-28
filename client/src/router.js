import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
