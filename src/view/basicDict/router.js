export default [
    {
        path: '/basicDict',
        name: 'basicDict',
        component: () => import('@/view/basicDict/list'),
        meta: {
            title: "字典管理"
        },
    }
]