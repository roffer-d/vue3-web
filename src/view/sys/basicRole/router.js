export default [
    {
        path: '/sys/basicRole',
        name: 'basicRole',
        component: () => import('@/view/sys/basicRole/list'),
        meta: {
            title: "角色管理"
        },
    }
]