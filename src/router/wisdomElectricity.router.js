export default [
    // {
    //     name: 'realtimeMonitor',
    //     path: 'realtimeMonitor',
    //     component: resolve => require(['views/wisdomElectricity/realtimeMonitor'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/realtimeMonitor',
    //         title: 'realtimeMonitor',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'electricityRealtimeMonitor',
    //     path: '/wisdomElectricity/realtimeMonitor/electricityRealtimeMonitor',
    //     component: resolve => require(['views/wisdomElectricity/realtimeMonitor/electricity'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/realtimeMonitor/electricityRealtimeMonitor',
    //         title: 'electricityRealtimeMonitor',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'alarmRealtimeMonitor',
    //     path: '/wisdomElectricity/realtimeMonitor/alarmRealtimeMonitor',
    //     component: resolve => require(['views/wisdomElectricity/realtimeMonitor/alarm'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/realtimeMonitor/alarmRealtimeMonitor',
    //         title: 'alarmRealtimeMonitor',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'realtimeControl',
    //     path: 'realtimeControl',
    //     component: resolve => require(['views/wisdomElectricity/realtimeControl'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/realtimeControl',
    //         title: 'realtimeControl',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'historicalData',
    //     path: 'historicalData',
    //     component: resolve => require(['views/wisdomElectricity/historicalData'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/historicalData',
    //         title: 'historicalData',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'alarmStatistics',
    //     path: 'alarmStatistics',
    //     component: resolve => require(['views/wisdomElectricity/alarmStatistics'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/alarmStatistics',
    //         title: 'alarmStatistics',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'alarmDetails',
    //     path: 'alarmDetails',
    //     component: resolve => require(['views/wisdomElectricity/alarmDetails'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/alarmDetails',
    //         title: 'alarmDetails',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'monitorReport',
    //     path: 'monitorReport',
    //     component: resolve => require(['views/wisdomElectricity/monitorReport'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/monitorReport',
    //         title: 'PowerConsumptionReport',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'electricityStatistics',
    //     path: '/wisdomElectricity/electricityStatistics',
    //     component: resolve => require(['views/wisdomElectricity/electricityStatistics'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomElectricity/electricityStatistics',
    //         title: 'electricityStatistics',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // 参数同步
    {
        name: 'paramterSync',
        path: '/wisdomElectricity/paramterSync',
        component: resolve => require(['views/wisdomElectricity/paramterSync'], resolve),
        meta: {
            activeMenu: '/wisdomElectricity/paramterSync',
            title: 'paramterSync',
            noCache: true,
            affix: false
        }
    },
    //设备运维
    {
        name: 'deviceMaintain',
        path: '/wisdomElectricity/deviceMaintain',
        component: resolve => require(['views/wisdomElectricity/deviceMaintain'], resolve),
        meta: {
            activeMenu: '/wisdomElectricity/deviceMaintain',
            title: 'deviceMaintain',
            noCache: true,
            affix: false
        }
    },
    //告警历史数据
     {
        name: 'historicalData/alarmHistoricalData',
        path: 'historicalData/alarmHistoricalData',
        component: resolve => require(['views/wisdomElectricity/historicalData/alarmHistoricalData'], resolve),
        meta: {
            activeMenu: '/wisdomElectricity/historicalData/alarmHistoricalData',
            title: 'alarmHistoricalData',
            noCache: true,
            affix: false
        }
    },
    //用电历史数据
    {
        name: 'historicalData/electricityHistoricalData',
        path: 'historicalData/electricityHistoricalData',
        component: resolve => require(['views/wisdomElectricity/historicalData/electricityHistoricalData'], resolve),
        meta: {
            activeMenu: '/wisdomElectricity/historicalData/electricityHistoricalData',
            title: 'electricityHistoricalData',
            noCache: true,
            affix: false
        }
    },


];
