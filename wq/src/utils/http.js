// import axios from 'axios';//引入axios
import router from '@/router/index'; //跳转用的
import store from '@/store/index' ; //获取或者删除vue的token的
import { removeLocal } from './localStorage';//删除本地token的
// import { Message, MessageBox } from 'element-ui';

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true // 是否允许带cookie这些
})

//拦截器操作
service.interceptors.request.use(config=>{
    if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
    return config;
},
    error => {
        return Promise.reject(error);
    });
service.interceptors.response.use(response=>{
    const data = response.data

   if (data.code == 1) {   //服务端定义的响应code码为1时请求成功获取到的数据
    return Promise.resolve(response.data) 
  }else if(data.code == 300)
   {
      //和后台商量，登陆过期了或者未登陆，返回code为300
                    store.commit('SET_TOKEN',''); //清除vuex的token,
                     removeLocal('token');//请求local的token
                    //跳转到登录页面
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
               
         
   }else
   {
    //  返回的data.code 值不等于1，那么在这里就是没有返回到合适的数据，就弹窗出来一个错误信息就行。
    ELEMENT.Message({
                          type: 'error',
                       showClose: true,
                        message: data.mes,
                        duration : 1500
                      })
    return Promise.reject(data)
   }

}, err => { //默认除了2XX之外的都是错误的，就会走这里
    if (err && err.response) {
    let res  = {};
    res.code = err.response.status;
    switch (err.response.status) {
        case 400: res.message = '请求错误(400)'; break;
        case 401: res.message = '未授权，请重新登录(401)'; break;
        case 403: res.message = '拒绝访问(403)'; break;
        case 404: res.message = '请求出错(404)'; break;
        case 408: res.message = '请求超时(408)'; break;
        case 500: res.message = '服务器错误(500)'; break;
        case 501: res.message = '服务未实现(501)'; break;
        case 502: res.message = '网络错误(502)'; break;
        case 503: res.message = '服务不可用(503)'; break;
        case 504: res.message = '网络超时(504)'; break;
        case 505: res.message = 'HTTP版本不受支持(505)'; break;
        default: res.message = `连接出错(${err.response.status})!`;
    }
    ELEMENT.Message({
      message: res.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(res)
} 
        //  这里没有用reject，因为后面的代码根本都没有对这个异常进行处理，所以这里就直接resolve，然后在then处理。
        // return Promise.resolve(err.response);// return Promise.reject(error.response.data)
        return Promise.reject(err)
    });
 
export default service; 