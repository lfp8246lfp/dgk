import Vue from 'vue';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

/**
 * 生成UUID
 * @returns {string}
 */
export const guid = function () {
    function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
};

/**
 *  判断是否为空
 * @returns {boolean}
 */
export const isNotEmpty = function (args) {
    return !isEmpty(args);
};

/**
 * 将对象重新封装成{code:'',label:''}型对象
 * 原对象属性为code 原对象属性值为label
 * @param obj
 * @returns {Array}
 */
export const packObjCodeAndLabelUtil = function (obj) {
    var objArr = [];
    for (var p in obj) {
        var object = {};
        object.code = p;
        object.label = obj[p];
        objArr.push(object);
    }
    return objArr;
};

/**
 * 深度复制对象
 * @param obj
 * @returns {*}
 */
export const cloneDeepObject = function (obj) {
    return cloneDeep(obj);
};

Vue.prototype.$utils = {
    isNotEmpty,
    packObjCodeAndLabelUtil,
    cloneDeepObject
};
