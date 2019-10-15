import 'babel-polyfill';
import Vue from 'vue';
import './api';

import router from './router';
import store from './store/index.js';
import './config';
import './components';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import VCharts from 'v-charts';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import App from './views/app.vue';

import VueQuillEditor from 'vue-quill-editor';

import './assets/js/rem.js';

import i18n from './i18n';

// Vue.use(i18n);
Vue.use(VCharts);
Vue.use(VueQuillEditor);
var qiniu = require('qiniu-js');
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
});

var routeList = [];
router.beforeEach((to, from, next) => {
    var index = routeList.indexOf(to.name);
    if (index !== -1) {
        // 如果存在路由列表，则把之后的路由都删掉
        routeList.splice(index + 1, routeList.length - index - 1);
    } else {
        routeList.splice(index + 1, routeList.length - index - 1);
        routeList.push(to.name);
    }
    to.meta.routeList = routeList;
    next();
});

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
