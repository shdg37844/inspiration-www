import BasicLayout from '@/components/Layout/BasicLayout.vue'
import HomeBasic from '@/views/Homepage/HomeBasic.vue'
import MyFav from '@/views/Homepage/MyFav.vue'
import FavDetail from '@/views/Homepage/FavDetail.vue'

export default [
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
                meta: { requireAuth: true }
            },
            {
                path: '/fav/:id',
                name: 'FavDetail',
                component: FavDetail,
                meta: { requireAuth: true }
            }

        ]

    },
]


