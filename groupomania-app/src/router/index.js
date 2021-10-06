import { createRouter, createWebHistory } from 'vue-router'
import connect from '../views/connect.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import Createpost from '../views/Createpost.vue'

const routes = [
  {
    path: '/',
    name: 'connect',
    component: connect
  },
  {
    path: '/signup',
    name: 'signup',
    component: connect
  },
  {
    path: '/login',
    name: 'login',
    component: connect
  },
    {
    path: '/Feed',
    name: 'Feed',
    component: Feed
  },
    {
     path: '/Profile',
     name: 'Profile',
     component: Profile
    },
    {
        path: '/Createpost',
        name: 'Createpost',
        component: Createpost

    }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
