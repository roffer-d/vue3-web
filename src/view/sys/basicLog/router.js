export default [
    {
        path: '/sys/basicLog',
        name: 'basicLog',
        component: () => import('@/view/sys/basicLog/list'),
        meta: {
            title: "操作日志管理"
        },
    }
]