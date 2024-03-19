import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/components/Layout/BasicLayout.vue'
import AccountLogin from '@/views/Common/AccountLogin.vue'
import HomeBasic from '@/views/Homepage/HomeBasic.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children:[
        {
          path: '', 
          name: 'home',
          component: HomeBasic,
        },

      ]

    },


    {
      path: '/login',
      name: 'AccountLogin',
      component: AccountLogin
    },
  ]
})

export default router
