import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tag: '全部',
    userInfo: {},
    articleList: [],
    languages: [],
    tags: [],
    activeIndex: '',
    articleId: ''
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
    },
    setArticleId (state, articleId) {
      state.articleId = articleId
    },
    setTag (state, tag) {
      state.tag = tag
    },
    setTags (state, data) {
      let tmpResult = data.split(',')
      let result = []
      result.push({
        value: 'all',
        label: '全部'
      })
      for (let i = 0; i < tmpResult.length; i++) {
        let obj = {}
        obj.value = tmpResult[i]
        obj.label = tmpResult[i]
        result.push(obj)
      }
      state.tags = result
    }
  },
  actions: {},
  modules: {
    tagsView
  }
})

export default store
