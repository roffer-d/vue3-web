export default [
    {
        path: '/basicRoleMenu',
        name: 'basicRoleMenu',
        component: () => import('@/view/basicRoleMenu/list'),
        meta: {
            title: "角色菜单管理"
        },
    }
]