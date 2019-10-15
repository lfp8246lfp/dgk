import Vue from 'vue';
import moment from 'moment';
import '../api/index';
import i18n from '../i18n/index';
const filters = {

    /**
     * 13422334455 转 134 2233 4455
     * @param mobile
     * @returns {string}
     */
    mobileAddSpace (mobile) {
        return mobile.toString().replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3');
    },

    /**
     * 将毫秒数时间转化为yyyy-MM-dd
     * @param time
     */
    longTimeToDefaultFormatDate (time) {
        if (!time) return '';
        return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
    },

    /**
     * 常量过滤器，接受常量对象
     * @param classArr
     * @param input
     * @returns {*}
     */
    constantsFilterArr (input, classArr) {
        if (!input || input === undefined) {
            return '';
        }
        if (classArr) {
            if (Array.isArray(classArr) && classArr.length > 0) {
                for (let i = 0, len = classArr.length; i < len; i++) {
                    if (classArr[i].code + '' === input + '') {
                        return classArr[i].label;
                    }
                }
            }
            if (classArr[input]) {
                return classArr[input];
            } else {
                return '';
            }
        } else {
            return '';
        }
    },
    numFilter (value) {
        let realVal = parseFloat(value).toFixed(2);
        return parseFloat(realVal);
    },

    changeCommType (value) {
        if (value == 1) {
            return i18n.t('item.wifi');
        } else if (value == 2) {
            return i18n.t('item.nb');
        } else if (value == 3) {
            return i18n.t('item.gprs');
        } else if (value == 4) {
            return i18n.t('item.plc');
        } else if (value == 5) {
            return i18n.t('item.485');
        } else if (value == 6) {
            return i18n.t('item.lora');
        }
    },
    changeAppType (value) {
        if (value == 1) {
            return i18n.t('item.wisdomElectricity');
        } else if (value == 2) {
            return i18n.t('item.wisdomEnergy');
        } else if (value == 3) {
            return i18n.t('item.wisdomSafe');
        } else if (value == 4) {
            return i18n.t('item.wisdomEnvironment');
        } else if (value == 5) {
            return i18n.t('item.wisdomLight');
        } else if (value == 6) {
            return i18n.t('item.wisdomCharge');
        }
    },
    changeDevType (value) {
        if (value == 1) {
            return i18n.t('item.terminal');
        } else if (value == 2) {
            return i18n.t('item.gateway');
        } else if (value == 3) {
            return i18n.t('item.1p');
        } else if (value == 4) {
            return i18n.t('item.2p');
        } else if (value == 5) {
            return i18n.t('item.ammeter');
        } else if (value == 6) {
            return i18n.t('item.waterMeter');
        } else if (value == 7) {
            return i18n.t('item.smoke');
        } else if (value == 8) {
            return i18n.t('item.waterPressure');
        } else if (value == 9) {
            return i18n.t('item.weatherStation');
        } else if (value == 10) {
            return i18n.t('item.streetLightContro');
        } else if (value == 11) {
            return i18n.t('item.sensor');
        } else if (value == 12) {
            return i18n.t('item.outlet');
        } else if (value == 13) {
            return i18n.t('item.alarmSystem');
        } else if (value == 14) {
            return i18n.t('item.clip');
        }
    },
    alaramStatus(value){
        if (value == 0) { 
            return i18n.t('item.noAlarm');
        } else if (value == 2) {
            return i18n.t('item.alarmed');
        }
    },
    changePointType (value) {
        if (value == 1) {
            return i18n.t('item.1p');
        } else if (value == 2) {
            return i18n.t('item.2p');
        }
    },
    changeDealStatus (value) {
        if (value == 1) {
            return i18n.t('item.dealwith');
        } else {
            return i18n.t('item.undealwieh');
        }
    },
    getDevTypeIcon (value) {
        if (value == 1) {
            return '../../../../static/images/terminal.png';
        } else if (value == 2) {
            return '../../../../static/images/gateway.png';
        } else if (value == 3) {
            return '../../../../static/images/1P.png';
        } else if (value == 4) {
            return '../../../../static/images/2P.png';
        } else if (value == 5) {
            return '../../../../static/images/elec-meter.png';
        } else if (value == 6) {
            return '../../../../static/images/water-meter.png';
        } else if (value == 7) {
            return '../../../../static/images/smoke-sensation.png';
        } else if (value == 8) {
            return '../../../../static/images/water-pressure.png';
        } else if (value == 9) {
            return '../../../../static/images/weather-station.png';
        } else if (value == 10) {
            return '../../../../static/images/street-lamp-control.png';
        } else if (value == 11) {
            return '../../../../static/images/sensor.png';
        } else if (value == 12) {
            return '../../../../static/images/switch.png';
        } else if (value == 13) {
            return '../../../../static/images/give-alarm.png';
        } else if (value == 14) {
            return '../../../../static/images/clamp.png';
        } else {
            return '../../../../static/images/terminal.png';
        }
    },

    getPostTypeIcon (value) {
        if (value == 1) {
            return '../../../../static/images/department.png';
        } else if (value == 2) {
            return '../../../../static/images/sub_department.png';
        } else if (value == 3) {
            return '../../../../static/images/post.png';
        } else if (value == 0) {
            return '../../../../static/images/global.png';
        } else {
            return '../../../../static/images/post.png';
        }
    },
    deviceStaus (value) {
        if (value == 0) {
            return i18n.t('deviceManage.offline');
        } else if (value == 1) {
            return i18n.t('deviceManage.online');
        } else {
            return i18n.t('deviceManage.offline');
        }
    },
    getErrorMsg (errortype, errorcode) {
        if (errortype == '0') {
            return i18n.t('errorMsg.errortype0');
        } else if (errortype == '1') {
            if (errorcode == '0') {
                return i18n.t('errorMsg.errorcode1_0');
            } else
            if (errorcode == '1') {
                return i18n.t('errorMsg.errorcode1_1');
            } else
            if (errorcode == '2') {
                return i18n.t('errorMsg.errorMsg.errorcode1_2');
            } else
            if (errorcode == '3') {
                return i18n.t('errorMsg.errorcode1_3');
            } else
            if (errorcode == '4') {
                return i18n.t('errorMsg.errorcode1_4');
            } else {
                return i18n.t('errorMsg.errorcode1_other');
            }
        } else if (errortype == '2' || errortype == '3') {
            if (errorcode == '0') {
                return i18n.t('errorMsg.errorcode23_0');
            } else if (errorcode == '3') {
                return i18n.t('errorMsg.errorcode23_3');
            } else if (errorcode == '4') {
                return i18n.t('errorMsg.errorcode23_4');
            } else if (errorcode == '12') {
                return i18n.t('errorMsg.errorcode23_12');
            } else {
                return i18n.t('errorMsg.errorcode23_other');
            }
        } else if (errortype == '4') {
            return i18n.t('errorMsg.errortype4');
        } else {
            return i18n.t('errorMsg.errortypeother');
        }
    }

};

for (let key of Object.keys(filters)) {
    Vue.filter(key, filters[key]);
}
