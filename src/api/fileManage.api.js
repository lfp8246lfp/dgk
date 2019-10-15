import { http, http1 } from './http';
export default [
    {
        name: 'getComboDataByParam',
        method: 'get',
        url: http + '/dgk/archives/deviceTypeService/getComboDataByParam'
    },
    {
        name: 'addRtuType',
        method: 'post',
        url: http + '/dgk/archives/deviceTypeService/addRtuType'
    },
    {
        name: 'deleteRtuType',
        method: 'post',
        url: http + '/dgk/archives/deviceTypeService/deleteRtuType'
    },
    {
        name: 'updateRtuType',
        method: 'post',
        url: http + '/dgk/archives/deviceTypeService/updateRtuType'
    },
    {
        name: 'queryRtuTypeList',
        method: 'get',
        url: http + '/dgk/archives/deviceTypeService/queryRtuTypeList'
    },
    {
        name: 'queryAreaList',
        method: 'get',
        url: http + '/dgk/archives/areaManageService/queryAreaList'
    },
    {
        name: 'addArea',
        method: 'post',
        url: http + '/dgk/archives/areaManageService/addArea'
    },
    {
        name: 'updateArea',
        method: 'post',
        url: http + '/dgk/archives/areaManageService/updateArea'
    },
    {
        name: 'deleteArea',
        method: 'post',
        url: http + '/dgk/archives/areaManageService/deleteArea'
    },
    // {
    //     name: 'device',
    //     method: 'get',
    //     url: http1 + '/fileManage/device/get'
    // },
    {
        name: 'queryDeviceList',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/queryDeviceList'
    },
    {
        name: 'queryDeviceTypeList',
        method: 'get',
        url: http + '/dgk/archives/deviceManageService/queryDeviceTypeList'
    },
    {
        name: 'deleteDevice',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/deleteDevice'
    },
    {
        name: 'manageAreaList',
        method: 'get',
        url: http + '/dgk/archives/deviceManageService/queryAreaList'
    },
    {
        name: 'updateDevice',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/updateDevice'
    },
    {
        name: 'addDevice',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/addDevice'
    },
    {
        name: 'queryPoint',
        method: 'get',
        url: http + '/dgk/archives/deviceManageService/queryPoint'
    },
    {
        name: 'addPoint',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/addPoint'
    },
    {
        name: 'deletePoint',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/deletePoint'
    },
    {
        name: 'updatePoint',
        method: 'post',
        url: http + '/dgk/archives/deviceManageService/updatePoint'
    }
];
