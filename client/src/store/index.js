import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    articleList: [
      {
        title: '标题标题标题标题标题标题标题标题标题标题标题标题',
        date: '2020/10/10',
        tag: {
          label: 'css',
          color: '#fff',
          type: 'info'
        }
      }
    ],
    languages: []
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
    }
  },
  actions: {},
  modules: {
    tagsView
  }
})

export default store
