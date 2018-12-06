// import Vue from 'vue';
// import Router from 'vue-router';

// Vue.use(Router);

import Layout from '@/components/layout/Home.vue';//布局文件


export const constantRouterMap =[
          {
            path: '/login',
            component: resolve => require(['@/pages/login'], resolve)
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
                    component: resolve => require(['@/pages/interface'], resolve),
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
                    component: resolve => require(['@/pages/request'], resolve),
                    meta: { title: 'request管理' ,icon: 'el-icon-lx-copy'}
                }
            ]
        },
        {
            path: '/response',
            component: Layout,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/pages/response'], resolve),
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
                    component: resolve => require(['@/pages/log'], resolve),
                    meta: { title: '日志管理' ,icon: 'el-icon-lx-favor'}
                },
                {
                    path: 'detail',
                    hidden: true,
                    component: resolve => require(['@/pages/log/logdetail.vue'], resolve),
                    meta: { title: '日志详情' ,icon: 'el-icon-lx-cascades',tag:'/log/index'}
                }
            ]
        },
         {
            path: '/chars',
            component: Layout,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/pages/chars'], resolve),
                    meta: { title: 'chars' ,icon: 'el-icon-lx-global'}
                }
            ]
        },
         {
            path: '/icon',
            component: Layout,
             hidden: true,
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/pages/icon'], resolve),
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
                    component: resolve => require(['@/pages/error/404.vue'], resolve),
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
                    component: resolve => require(['@/pages/error/404.vue'], resolve),
                }
            ]
        },
        {
            path: '*',
            redirect: '/404/index',
            hidden: true
        }
    ]

