import {http, http1} from './http';
export default [
    {
        name: 'queryAuthorizeTreeList',
        method: 'get',
        url: http + '/dgk/authConfigureService/queryAuthorizeTreeList'
    },
    {
        name: 'getAuthorizeTree',
        method: 'post',
        url: http + '/dgk/authConfigureService/getAuthorizeTree'
    },
    {
        name: 'addAuthorize',
        method: 'post',
        url: http + '/dgk/authConfigureService/addAuthorize'
    },
    {
        name: 'updateAuthorize',
        method: 'post',
        url: http + '/dgk/authConfigureService/updateAuthorize'
    },
    {
        name: 'deleteAuthorize',
        method: 'post',
        url: http + '/dgk/authConfigureService/deleteAuthorize'
    },
    {
        name: 'authorize',
        method: 'post',
        url: http + '/dgk/authConfigureService/authorize'
    },
    {
        name: 'queryAuthorizeTree',
        method: 'post',
        url: http + '/dgk/authConfigureService/queryAuthorizeTree'
    },
    // 查询账户
    {
        name: 'queryAccountAuthorizeTreeList',
        method: 'post',
        url: http + '/dgk/accountManageService/queryAuthorizeTreeList'
    },
    {
        name: 'addAccount',
        method: 'post',
        url: http + '/dgk/accountManageService/addAccount'
    },
    {
        name: 'deleteAccount',
        method: 'post',
        url: http + '/dgk/accountManageService/deleteAccount'
    },
    {
        name: 'updateAccount',
        method: 'post',
        url: http + '/dgk/accountManageService/updateAccount'
    }
];
