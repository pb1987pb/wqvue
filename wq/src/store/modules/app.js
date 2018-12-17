const app = {
  state: {
    collapse: false,
    keepAlive:[],
  },
  mutations: {
    SET_COLLAPSE: (state, collapse) => {
      state.collapse = collapse
    },
    SET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive = keepAlive
    }
  
  },
  actions: {
  }
}
export default app