import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
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
    languages: [
      { name: 'JavaScript', language: 'js' },
      { name: 'Java', language: 'java' },
      { name: 'NodeJs', language: 'nodeJs' }
    ]
  },
  getters,
  mutations: {
    setArticleList (state, data) {
      state.articleList = data
    },
    setLanguages (state, data) {
      state.languages = data
    }
  },
  actions: {},
  modules: {
    tagsView
  }
})

export default store
