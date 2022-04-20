export default [
    {
        path: '/basicUserRole',
        name: 'basicUserRole',
        component: () => import('@/view/basicUserRole/list'),
        meta: {
            title: "用户角色管理"
        },
    }
]