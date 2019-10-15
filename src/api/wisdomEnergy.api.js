import {http, http2, http3} from './http';
export default [
    //智慧能效的历史数据
    {
        name: 'queryHistoricalData',
        method: 'post',
        url: http + '/dgk/energy/energyHistDataService/queryHistoricalData'
    },
    // 水表档案
    {
        name: 'queryApptypeList',
        method: 'get',
        url: http + '/dgk/energy/energyHistDataService/queryApptypeList'
    },
    // 水表历史数据
    {
        name: 'queryWaterData',
        method: 'post',
        url: http + '/dgk/energy/energyHistDataService/queryWaterData'
    },
    // 电表档案
    {
        name: 'queryMeterList',
        method: 'get',
        url: http + '/dgk/energy/energyHistDataService/queryMeterList'
    },
    // 电表下的wifi开关
    {
        name: 'queryWIfiList',
        method: 'get',
        url: http + '/dgk/energy/energyHistDataService/queryWIfiList'
    },

    {
        name: 'queryMeterData',
        method: 'post',
        url: http + '/dgk/energy/energyHistDataService/queryMeterData'
    },
];
