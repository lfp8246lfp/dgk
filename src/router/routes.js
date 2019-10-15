import Layout from '../views/layout/layout.vue';
import CommonRouter from './common.router';
import SubLayout from '../views/subLayout/index.vue';
import GisMapRouter from './gisMap.router.js';
import FileManageRouter from './fileManage.router';
import WisdomElectricityRouter from './wisdomElectricity.router';
import WisdomEnergyRouter from './wisdomEnergy.router';
import WisdomSafeRouter from './wisdomSafe.router';
import WisdomEnvironmentRouter from './wisdomEnvironment.router';
import SystemManageRouter from './systemManage.router';

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                redirect: 'home'

            },
            {
                name: 'home',
                path: 'home',
                component: resolve => require(['views/homePage'], resolve)
            },
            ...CommonRouter
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: resolve => require(['views/login'], resolve)
    },
    {
        path: '/gisMap',
        component: SubLayout,
        redirect: '/gisMap/smartEletricity',
        children: [
            ...GisMapRouter
        ]
    },
    {
        path: '/fileManage',
        component: SubLayout,
        redirect: '/fileManage/area',
        children: [
            ...FileManageRouter
        ]
    },
    {
        path: '/wisdomElectricity',
        component: SubLayout,
        redirect: '/wisdomElectricity/realtimeMonitor',
        children: [
            ...WisdomElectricityRouter
        ]
    },
    {
        path: '/wisdomEnergy',
        component: SubLayout,
        redirect: '/wisdomEnergy/energyMonitor',
        children: [
            ...WisdomEnergyRouter
        ]
    },
    {
        path: '/wisdomSafe',
        component: SubLayout,
        redirect: '/wisdomSafe/deviceTopology',
        children: [
            ...WisdomSafeRouter
        ]
    },
    {
        path: '/wisdomEnvironment',
        component: SubLayout,
        redirect: '/wisdomEnvironment/regionalMonitor',
        children: [
            ...WisdomEnvironmentRouter
        ]
    },
    {
        path: '/systemManage',
        component: SubLayout,
        redirect: '/systemManage/permissionConfiguration',
        children: [
            ...SystemManageRouter
        ]
    }

];

export default routes;
