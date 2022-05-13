export default [
    {
        path: '/sys/onlineUser',
        name: 'onlineUsers',
        component: () => import('@/view/sys/onlineUser/list'),
        meta: {
            title: "在线用户",
            code: 'onlineUser'
        },
    }
]