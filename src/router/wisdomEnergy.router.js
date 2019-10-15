import SubLayout from '../views/subLayout/index.vue';

export default [
    //实时数据
    {
        name: 'realTimeData',
        path: 'realTimeData',
        component: resolve => require(['views/wisdomEnergy/realTimeData'], resolve),
        meta: {
            activeMenu: '/wisdomEnergy/realTimeData',
            title: 'realTimeData',
            noCache: true,
            affix: false
        }
    },
    //远程控制
    {
        name: 'remoteControl',
        path: 'remoteControl',
        component: resolve => require(['views/wisdomEnergy/remoteControl'], resolve),
        meta: {
            activeMenu: '/wisdomEnergy/remoteControl',
            title: 'remoteControl',
            noCache: true,
            affix: false
        }
    },
    //能效分析（历史数据）
    {
        name: 'energyAnalysis',
        path: 'energyAnalysis',
        component: resolve => require(['views/wisdomEnergy/energyAnalysis'], resolve),
        meta: {
            activeMenu: '/wisdomEnergy/energyAnalysis',
            title: 'energyAnalysis',
            noCache: true,
            affix: false
        }
    },
     //参数下装
     {
        name: 'energyParamterSync',
        path: 'energyParamterSync',
        component: resolve => require(['views/wisdomEnergy/energyParamterSync'], resolve),
        meta: {
            activeMenu: '/wisdomEnergy/energyParamterSync',
            title: 'energyParamterSync',
            noCache: true,
            affix: false
        }
    },
     //电表数据(能效分析)
     {
        name: 'meterData',
        path: 'meterData',
        component: resolve => require(['views/wisdomEnergy/meterData'], resolve),
        meta: {
            activeMenu: '/wisdomEnergy/meterData',
            title: 'meterData',
            noCache: true,
            affix: false
        }
    },
     //水表数据
     {
        name: 'waterMeterData',
        path: 'waterMeterData',
        component: resolve => require(['views/wisdomEnergy/waterMeterData'], resolve),
        meta: {
            activeMenu: '/wisdomEnergy/waterMeterData',
            title: 'waterMeterData',
            noCache: true,
            affix: false
        }
    },


    // {
    //     name: 'energyMonitor',
    //     path: 'energyMonitor',
    //     component: resolve => require(['views/wisdomEnergy/energyMonitor'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnergy/energyMonitor',
    //         title: 'energyMonitor',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'energyStatistics/electric',
    //     path: 'energyStatistics/electric',
    //     component: resolve => require(['views/wisdomEnergy/energyStatistics/electric'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnergy/energyStatistics/electric',
    //         title: 'electricityConsumptionAnalysis',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'energyStatistics/water',
    //     path: 'energyStatistics/water',
    //     component: resolve => require(['views/wisdomEnergy/energyStatistics/water'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnergy/energyStatistics/water',
    //         title: 'waterConsumptionAnalysis',
    //         noCache: true,
    //         affix: false
    //     }
    // },

    // {
    //     name: 'electricityLoop',
    //     path: 'electricityLoop',
    //     component: resolve => require(['views/wisdomEnergy/electricityLoop'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnergy/electricityLoop',
    //         title: 'electricityLoop',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'waterLoop',
    //     path: 'waterLoop',
    //     component: resolve => require(['views/wisdomEnergy/waterLoop'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnergy/waterLoop',
    //         title: 'waterLoop',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'energyReport',
    //     path: 'energyReport',
    //     component: resolve => require(['views/wisdomEnergy/energyReport'], resolve),
    //     meta: {
    //         activeMenu: '/wisdomEnergy/energyReport',
    //         title: 'EnergyefficiencyReport',
    //         noCache: true,
    //         affix: false
    //     }
    // }

];
