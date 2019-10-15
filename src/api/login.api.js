import {http, http1} from './http';
export default [
    {
        name: 'login',
        method: 'post',
        url: http + '/dgk/authService/login'
    },
    {
        name: 'getMenuList',
        method: 'get',
        url: http + '/dgk/homeService/getMenuList'
    },
    {
        name: 'loginVerify',
        method: 'post',
        url: http + '/dgk/authService/loginVerify'
    },
    {
        name: 'logout',
        method: 'get',
        url: http + '/dgk/homeService/logout'
    },
    {
        name: 'updatePassword',
        method: 'post',
        url: http + '/dgk/homeService/updatePassword'
    }
];
export const upload = http + '/uploadService/upload';
export const uploadExcel = http + '/uploadService/uploadExcel';
