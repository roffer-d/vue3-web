export default [
    {
        path: '/basicDict',
        name: 'basicDict',
        component: () => import('@/view/sys/basicDict/list'),
        meta: {
            title: "字典管理"
        },
    }
]