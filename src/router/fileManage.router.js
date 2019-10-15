export default [
    {
        name: 'area',
        path: 'area',
        component: resolve => require(['views/fileManage/area'], resolve),
        meta: {
            activeMenu: '/fileManage/area',
            title: 'areaManage',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'deviceType',
        path: 'deviceType',
        component: resolve => require(['views/fileManage/deviceType'], resolve),
        meta: {
            activeMenu: '/fileManage/deviceType',
            title: 'deviceClassify',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'device',
        path: 'device',
        component: resolve => require(['views/fileManage/device'], resolve),
        meta: {
            activeMenu: '/fileManage/device',
            title: 'deviceManage',
            noCache: true,
            affix: false
        }
    },
    // {
    //     name: 'deviceMaintain',
    //     path: 'deviceMaintain',
    //     component: resolve => require(['views/fileManage/deviceMaintain'], resolve),
    //     meta: {
    //         activeMenu: '/fileManage/deviceMaintain',
    //         title: 'deviceMaintain',
    //         noCache: true,
    //         affix: false
    //     }
    // }
];
