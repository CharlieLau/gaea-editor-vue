
import Vue from 'vue';
import App from './App';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store/index';
import router from './route/router';

import GaeaEditor from '../../lib/index';

Vue.use(iView);
Vue.use(GaeaEditor, {store});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
