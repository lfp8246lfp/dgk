import Vue from 'vue';
import store from '../store';
import axios from 'axios';
import apis from './apis';
import {
    LOADING
} from '../store/mutation-types';
import {
    Message
} from 'element-ui';

let httpCount = 0;
axios.interceptors.request.use(function (config) {
    httpCount += 1;
    const HTTP_ACCESS_TOKEN = localStorage.getItem('HTTP_ACCESS_TOKEN');
    // console.log(HTTP_ACCESS_TOKEN);
    if (HTTP_ACCESS_TOKEN) {
        config.headers['HTTP_ACCESS_TOKEN'] = HTTP_ACCESS_TOKEN;
    }
    if (!store.getters.loading) {
        store.commit(LOADING, true);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 查找服务
 * @param apiName
 * @returns {Array}
 */
function getApi (apiName) {
    const item = apis.filter((item) => {
        if (item['name'] === apiName) {
            return item;
        }
    });
    if (item.length === 1) {
        return item[0];
    } else {
        throw new Error(`无法找到该服务${apiName}`);
    }
}

/**
 * 接口处理
 * @param resp
 * @param resolve
 * @param reject
 */
function successHandler (resp, resolve, reject) {
    if (resp.data.code === 0) {
        resolve(resp.data);
    } else if (resp.data.code === 200) {
        resolve(resp.data);
    } else {
        errorHandler(reject, resp.data);
    }
}

/**
 * 错误接口处理
 * @param error
 * @param reject
 */
function errorHandler (reject, err) {
    if (err && err.next) {
        reject(err);
    } else {
        Message({
            title: '提示',
            message: err ? err.message : '系统异常，请联系管理员',
            type: 'error',
            duration: 3000
        });
        done();
    }
}

/**
 * 去掉遮罩
 */
function done () {
    httpCount -= 1;
    if (httpCount === 0) {
        store.commit(LOADING, false);
    }
}

/**
 * 为全局对象Vue绑定$request函数
 * @param apiName
 * @param params
 * @returns {*}
 */
Vue.prototype.$request = (apiName, params) => {
    const item = getApi(apiName);
    return new Promise((resolve, reject) => {
        axios[item['method']](item['url'], params).then(resp => {
            // successHandler(resp, resolve, reject);
            resolve(resp.data);
        }).catch(() => {
            errorHandler(reject);
        });
    }).finally(done);
};
// moke专用
// Vue.prototype.$request = (apiName, params) => {
//     return new Promise((resolve, reject) => {
//         axios.get(apiName, params).then(resp => {
//             // successHandler(resp, resolve, reject);
//             resolve(resp);
//         }).catch(() => {
//             errorHandler(reject);
//         });
//     }).finally(done);
// };
