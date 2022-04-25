export default [
    {
        path: '/basicUser',
        name: 'basicUser',
        component: () => import('@/view/basicUser/list'),
        meta: {
            title: "用户管理"
        },
    }
]