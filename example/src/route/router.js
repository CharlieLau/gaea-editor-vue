import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../pages/default.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'default',
            component: Demo
        }
    ]
})
;
