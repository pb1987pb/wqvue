 import { setLocal, getLocal ,removeLocal } from '@/utils/localStorage.js'
  import { login, getUserInfo ,logout } from '@/api/login.js'
 const user = {
  state: {
    token: getLocal('token') || '',
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    Login({ commit }, data){
             return new Promise((resolve, reject)  => {
      //resolve()   reject(error)
      login(data).then(res=>{
         commit('SET_TOKEN',res.sessionId);
         setLocal('token',res.sessionId);
         resolve(res);
      }).catch(err =>{
          reject(err);
      })
    })
  },
  GetUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(res => {

        const data = res.data
          
         //console.log(Object.prototype.toString.apply(data.roles).slice(8, -1))
        // 这里是用的easy.mock返回的数据
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array !');
          return;
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
      // 后台登出，需要主动发送请求
  LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
          logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeLocal('token');           
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeLocal('token')
      resolve()
    })
  }
}
  
}
export default user