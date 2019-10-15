export default [{
    name: 'smartEletricity',
    path: 'smartEletricity',
    component: resolve => require(['views/gisMap/smartEletricity'], resolve),
    meta: {
        activeMenu: '/gisMap',
        title: 'GISMap',
        noCache: true,
        affix: true
    }
}
    // {
    //     name: 'smartEnergy',
    //     path: 'smartEnergy',
    //     component: resolve => require(['views/gisMap/smartEnergy'], resolve),
    //     meta: {
    //         activeMenu: '/gisMap/smartEnergy',
    //         title: '智慧能效',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'smartSafe',
    //     path: 'smartSafe',
    //     component: resolve => require(['views/gisMap/smartSafe'], resolve),
    //     meta: {
    //         activeMenu: '/gisMap/smartSafe',
    //         title: '智慧安全',
    //         noCache: true,
    //         affix: false
    //     }
    // },
    // {
    //     name: 'smartEnvironment',
    //     path: 'smartEnvironment',
    //     component: resolve => require(['views/gisMap/smartEnvironment'], resolve),
    //     meta: {
    //         activeMenu: '/gisMap/smartEnvironment',
    //         title: '智慧环境',
    //         noCache: true,
    //         affix: false
    //     }
    // }

];
