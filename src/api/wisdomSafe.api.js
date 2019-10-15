import {http, http2, http3} from './http';
export default [
    //智慧安全的查询安全设备实时状态
    {
        name: 'queryDeviceRealTimeStatus',
        method: 'get',
        url: http + '/dgk/energy/safetyHistDataService/queryDeviceRealTimeStatus'
    },
    {
        name: 'querySafeDeviceHistData',
        method: 'post',
        url: http + '/dgk/energy/safetyHistDataService/querySafeDeviceHistData'
    },
];
