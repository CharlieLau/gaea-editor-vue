import Vue from 'vue';
import Vuex from 'vuex';

import application from './modules/editor/application';
import viewport from './modules/editor/viewport';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        application,
        viewport
    }
});

export default store;
