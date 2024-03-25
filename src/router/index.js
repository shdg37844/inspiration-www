import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/components/Layout/BasicLayout.vue'
import HomeBasic from '@/views/Homepage/HomeBasic.vue'
import MyFav from '@/views/Homepage/MyFav.vue'
import FavDetail from '@/views/Homepage/FavDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeBasic,
        },
        {
          path: '/fav',
          name: 'fav',
          component: MyFav,
        },
        {
          path: '/fav/:id',
          name: 'FavDetail',
          component: FavDetail,
        }

      ]

    },



  ]
})

export default router
