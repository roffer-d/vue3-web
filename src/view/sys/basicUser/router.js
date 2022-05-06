export default [
    {
        path: '/sys/basicUser',
        name: 'basicUser',
        component: () => import('@/view/sys/basicUser/list'),
        meta: {
            title: "用户管理"
        },
    }
]