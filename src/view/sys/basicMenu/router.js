export default [
    {
        path: '/sys/basicMenu',
        name: 'basicMenu',
        component: () => import('@/view/sys/basicMenu/list'),
        meta: {
            title: "菜单管理"
        },
    }
]