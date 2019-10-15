export default [
    {
        name: 'permissionConfiguration',
        path: 'permissionConfiguration',
        component: resolve => require(['views/systemManage/permissionConfiguration'], resolve),
        meta: {
            activeMenu: '/systemManage/permissionConfiguration',
            title: 'permissionConfiguration',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'systemLog',
        path: 'systemLog',
        component: resolve => require(['views/systemManage/systemLog'], resolve),
        meta: {
            activeMenu: '/systemManage/systemLog',
            title: 'systemLog',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'dataBackup',
        path: 'dataBackup',
        component: resolve => require(['views/systemManage/dataBackup'], resolve),
        meta: {
            activeMenu: '/systemManage/dataBackup',
            title: 'dataBackup',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'collectionScheme',
        path: 'collectionScheme',
        component: resolve => require(['views/systemManage/collectionScheme'], resolve),
        meta: {
            activeMenu: '/systemManage/collectionScheme',
            title: 'collectionScheme',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'pushConfiguration',
        path: 'pushConfiguration',
        component: resolve => require(['views/systemManage/pushConfiguration'], resolve),
        meta: {
            activeMenu: '/systemManage/pushConfiguration',
            title: 'pushConfiguration',
            noCache: true,
            affix: false
        }
    },
    {
        name: 'accountmanage',
        path: 'accountmanage',
        component: resolve => require(['views/systemManage/accountmanage'], resolve),
        meta: {
            activeMenu: '/systemManage/accountmanage',
            title: 'accountmanage',
            noCache: true,
            affix: false
        }
    }

];
