export default [
    //烟感实时状态
    {
        name: 'smokeRealTimeStatus',
        path: 'smokeRealTimeStatus',
        component: resolve => require(['views/wisdomSafe/smokeRealTimeStatus'], resolve),
        meta: {
            activeMenu: '/wisdomSafe/smokeRealTimeStatus',
            title: 'smokeRealTimeStatus',
            noCache: true,
            affix: false
        }
    },
    //手报实时状态
    {
        name: 'handReportRealTimeStatus',
        path: 'handReportRealTimeStatus',
        component: resolve => require(['views/wisdomSafe/handReportRealTimeStatus'], resolve),
        meta: {
            activeMenu: '/wisdomSafe/handReportRealTimeStatus',
            title: 'handReportRealTimeStatus',
            noCache: true,
            affix: false
        }
    },
     //水压实时状态
     {
        name: 'waterPressureRealTimeStatus',
        path: 'waterPressureRealTimeStatus',
        component: resolve => require(['views/wisdomSafe/waterPressureRealTimeStatus'], resolve),
        meta: {
            activeMenu: '/wisdomSafe/waterPressureRealTimeStatus',
            title: 'waterPressureRealTimeStatus',
            noCache: true,
            affix: false
        }
    },
    // {
    //     name: 'deviceTopology',
    //     path: 'deviceTopology',
    //     component: resolve => require(['views/wisdomSafe/deviceTopology'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomSafe/deviceTopology',
    //         title: 'deviceTopology',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'perceptionData',
    //     path: 'perceptionData',
    //     component: resolve => require(['views/wisdomSafe/perceptionData'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomSafe/perceptionData',
    //         title: 'perceptionData',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'brokenRecord',
    //     path: 'brokenRecord',
    //     component: resolve => require(['views/wisdomSafe/brokenRecord'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomSafe/brokenRecord',
    //         title: 'brokenRecord',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'equipmentInspection',
    //     path: 'equipmentInspection',
    //     component: resolve => require(['views/wisdomSafe/equipmentInspection'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomSafe/equipmentInspection',
    //         title: 'equipmentInspection',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'safeReport',
    //     path: 'safeReport',
    //     component: resolve => require(['views/wisdomSafe/safeReport'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomSafe/safeReport',
    //         title: 'safeReport',
    //         noCache: true,
    //         affix: false
    //     }
    // }

];
