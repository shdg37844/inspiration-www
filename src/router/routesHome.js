const HomeBasic = () =>
    import(/* webpackChunkName: "inspiration" */ '@/views/Homepage/HomeBasic.vue')

export default [
    {
        path: '/inspiration',
        name: 'Inspiration',
        component: HomeBasic,
        children:[
            {
                path:'/',
            }
        ]

    }
]