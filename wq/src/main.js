// import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import ElementUI from 'element-ui';

import 'normalize.css';//基本样式
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './styles/index.css';
import "babel-polyfill"; //兼容 e9和一些低版本的高级浏览器对es6新语法不支持

import http from '@/utils/http.js'
Vue.prototype.$axios=http;
import cookie from 'js-cookie'
Vue.prototype.$cookie=cookie;
// Vue.use(ElementUI, { size: 'small' });
// Vue.prototype.$axios = axios;

import deldialog from './components/common/deldialog';
import pagination from './components/common/pagination';

Vue.component('deldialog',deldialog); 
Vue.component('pagination',pagination); 
import './router/permission'; //动态异步路由处理


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');