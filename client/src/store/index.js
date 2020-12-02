import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    articleList: [],
    languages: [],
    activeIndex: ''
  },
  getters,
  mutations: {
    setArticleList (state, data) {
      state.articleList = data
    },
    setLanguages (state, data) {
      state.languages = data
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setActiveIndex (state, data) {
      state.activeIndex = data
    }
  },
  actions: {},
  modules: {
    tagsView
  }
})

export default store
