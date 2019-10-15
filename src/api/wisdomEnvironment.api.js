import {http, http2, http3} from './http';
export default [
    //智慧环境的历史数据
    {
        name: 'queryEnvironmentHistData',
        method: 'post',
        url: http + '/dgk/energy/realTimeDataService/queryEnvironmentHistData'
    },
];
