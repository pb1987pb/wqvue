// import Vue from 'vue';
// import Router from 'vue-router';

// Vue.use(Router);

import Layout from '@/components/common/Home.vue';


export const constantRouterMap =[
          {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
]
export default new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
        {
            path: '/',
            redirect: '/interface/index',
            hidden: true
        },
        {
            path: '/interface',
            component: Layout,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '接口管理',icon: 'el-icon-lx-cascades' }
                }
            ]
        },
         {
            path: '/request',
            component: Layout,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['../components/page/Request.vue'], resolve),
                    meta: { title: 'request管理' ,icon: 'el-icon-lx-copy'}
                }
            ]
        },
        {
            path: '/reponse',
            component: Layout,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['../components/page/Response.vue'], resolve),
                    meta: { title: 'reponse管理' ,icon: 'el-icon-lx-emoji'},
                },
            ]
        },
          {
            path: '/log',
            component: Layout,
            meta: { title: '自述文件' },
            children:[
                {
                    path: 'index',
                    component: resolve => require(['../components/page/log.vue'], resolve),
                    meta: { title: '日志管理' ,icon: 'el-icon-lx-favor'}
                },
                {
                    path: 'detail',
                    hidden: true,
                    component: resolve => require(['../components/page/logdetail.vue'], resolve),
                    meta: { title: '日志详情' ,icon: 'el-icon-lx-cascades'}
                }
            ]
        },
        {
            path: '/404',
            component: Layout,
             hidden: true,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                }
            ]
        },
        {
            path: '/403',
            component: Layout,
             hidden: true,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                }
            ]
        },
        {
            path: '*',
            redirect: '/404/index',
            hidden: true
        }
    ]

