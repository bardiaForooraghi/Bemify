import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Settings from './views/Settings.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import Playlist from './views/Playlist.vue'

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
      path: '/settings',
      name: 'settings',
      component: Settings
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup
    }, {
      path: '/profile/:account_id',
      name: 'profile',
      component: Profile,
      props: true
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    }
  ]
})
