export default [
    {
        path: '/user',
        name: 'user',
        component: () => import('@/view/user/list'),
        meta: {
            title: "用户管理"
        },
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/view/user/info'),
        meta: {
            title: "用户信息"
        },
    }
]