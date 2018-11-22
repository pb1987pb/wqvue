import router from './index'
import store from '@/store/index'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式

// import { Message } from 'element-ui'
import { getLocal } from '@/utils/localStorage.js' // 

// 权限判断
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true //不需要权限的直接通过
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  // NProgress.start() // 开启Progress
  if (getLocal('token')) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      // console.log('from', from)
      // console.log('to', to)
      console.log(store.getters.roles+"角色");
      // console.log('用户是否已拉取完user_info信息==src==', store.getters.roles.length === 0)

      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                   //这里是模拟
             store.commit('SET_ROLES',['admin']);
             store.commit('SET_NAME','admin');
            var roles = store.getters.roles;
 store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.log(store.getters.addRouters)
            // console.log(2222222222)
            next({ ...to }) // hack方法 确保addRoutes已完成
          })
        // store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        //   var roles = store.getters.roles
        //   store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
        //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //     console.log(store.getters.addRouters)
        //     // console.log(2222222222)
        //     next({ ...to }) // hack方法 确保addRoutes已完成
        //   })

        // }).catch(() => {
        //      console.log('到错误来了');
        //    //这里是拉取个人信息失败,获取拉取到的权限不是一个数组，都会到这里
        //   store.dispatch('FedLogOut').then(() => {
        //     ELEMENT.Message.error('验证失败,请重新登录')
        //     next(`/login?redirect=${to.fullPath}`);
        //   })
        // })
       
      } else {
        // // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // console.log('没有动态改变权限的需求可直接next() 删除下方权限判断 ↓', store.getters.roles, to.meta.role)
        // if (hasPermission(store.getters.roles, to.meta.role)) {
        //   next()
        // } else {
        //   next({ path: '/401', query: { noGoBack: true }})
        //   NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        // }
        // // 可删 ↑

       
      }
     next();
    }
  } else {

     // 方法一，设置一个白名单，适合后台的前端，后台白名单比较少，一般的就是 登录啊，404啊，403啊，这些
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页，把要跳转的地址作为参数传到下一步
      // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
    //  方法二，适合前台的前端，白名单叫多，这里就设置必须登录的页面
    // if(to.matched.some(r => r.meta.requiresAuth))
    // {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
    //   })
    // }else{
    //   next()
    // }
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})
