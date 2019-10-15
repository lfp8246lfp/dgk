export default [
    //设备实时数据
    {
        name: 'deviceRealTimeData',
        path: 'deviceRealTimeData',
        component: resolve => require(['views/wisdomEnvironment/deviceRealTimeData'], resolve),
        meta: {
            activeMenu: '/wisdomEnvironment/deviceRealTimeData',
            title: 'deviceRealTimeData',
            noCache: true,
            affix: false
        }
    },
     //环境数据（历史数据）
    {
        name: 'environmentData',
        path: 'environmentData',
        component: resolve => require(['views/wisdomEnvironment/environmentData'], resolve),
        meta: {
            activeMenu: '/wisdomEnvironment/environmentData',
            title: 'environmentData',
            noCache: true,
            affix: false
        }
    },
    // {
    //     name: 'regionalMonitor',
    //     path: 'regionalMonitor',
    //     component: resolve => require(['views/wisdomEnvironment/regionalMonitor'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnvironment/regionalMonitor',
    //         title: 'environmentMonitor',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'environmentData',
    //     path: 'environmentData',
    //     component: resolve => require(['views/wisdomEnvironment/environmentData'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnvironment/environmentData',
    //         title: 'environmentData',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'environmentReport',
    //     path: 'environmentReport',
    //     component: resolve => require(['views/wisdomEnvironment/environmentReport'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnvironment/environmentReport',
    //         title: 'environmentReport',
    //         noCache: true,
    //         affix: false
    //     }
    // }

];
