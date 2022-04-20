export default [
    {
        path: '/basicMenu',
        name: 'basicMenu',
        component: () => import('@/view/basicMenu/list'),
        meta: {
            title: "菜单管理"
        },
    }
]