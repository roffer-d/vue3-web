export default [
    {
        path: '/basicRole',
        name: 'basicRole',
        component: () => import('@/view/basicRole/list'),
        meta: {
            title: "角色管理"
        },
    }
]