import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Settings from './views/Settings.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import Playlist from './views/Playlist.vue'
import PageNotFound from './views/PageNotFound.vue'

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
      component: Settings,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
          next()
        } else {
          next('/pageNotFound')
        }
      }
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
          next()
        } else {
          next('/pageNotFound')
        }
      }
    }, {
      path: '/search',
      name: 'search',
      component: Search,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
          next()
        } else {
          next('/pageNotFound')
        }
      }
    }, {
      path: '/playlist/:playlist_id',
      name: 'playlist',
      component: Playlist,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
          next()
        } else {
          next('/pageNotFound')
        }
      }
    }, {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
})
