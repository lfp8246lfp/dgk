import {http, http2, http3} from './http';
export default [
    {
        name: 'sendData',
        method: 'post',
        url: http2 + '/service/protocolservice/SendMessageService/sendData'
    },
    {
        name: 'receiveData',
        method: 'post',
        url: http2 + '/service/protocolservice/ReceiveMessageService/receiveData'
    },
    // 定时策略
    {
        name: 'deviceStrategies',
        method: 'get',
        url: http2 + '/service/archivesservice/StrategiesService/getDeviceStrategies'
    },
    //设置阈值 
    {
        name: 'getDcuThreshold',
        method: 'get',
        url: http2 + '/service/archivesservice/ArchivesService/getDcuThreshold'
    },

    // {
    //     name: 'addPoint',
    //     method: 'post',
    //     url: http3 + '/power/equipmentService/addPoint'
    // },
    {
        name: 'queryEquipmentByType',
        method: 'post',
        url: http3 + '/power/equipmentService/queryByType'
    },
    {
        name: 'queryElectricityDeivceList',
        method: 'post',
        url: http + '/dgk/electricity/historicalDataService/queryElectricityDeivceList'
    },
    {
        name: 'queryPointList',
        method: 'get',
        url: http + '/dgk/electricity/historicalDataService/queryPointList'
    },
    {
        name: 'queryPointData',
        method: 'post',
        url: http + '/dgk/electricity/historicalDataService/queryPointList'
    },
    //查询告警类型列表
    {
        name: 'queryEventList',
        method: 'get',
        url: http + '/dgk/electricity/historicalDataService/queryEventList'
    },
    //查询智慧用电告警记录
    {
        name: 'queryElectricityRtuAlarm',
        method: 'post',
        url: http + '/dgk/electricity/historicalDataService/queryElectricityRtuAlarm'
    },

    // 处理告警
    {
        name: 'dealAlarm',
        method: 'put',
        url: http + '/dgk/electricity/historicalDataService/dealAlarm'
    },

];
