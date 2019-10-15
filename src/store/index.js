import Vue from 'vue';
import Vuex from 'vuex';
import loading from './modules/loading';
import menu from './modules/menu';
import tagsView from './modules/tagsView';
import app from './modules/app';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters,
    modules: {
        loading,
        menu,
        tagsView,
        app

    },

    strict: process.env.NODE_ENV !== 'production'

});

export default store;
