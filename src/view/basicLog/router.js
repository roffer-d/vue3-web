export default [
    {
        path: '/basicLog',
        name: 'basicLog',
        component: () => import('@/view/basicLog/list'),
        meta: {
            title: "操作日志管理"
        },
    }
]