// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueHtml5Editor from 'vue-html5-editor'
import html5EditorConfig from './config/html5-editor-config'
import ElementUI from 'element-ui'
import AUISS from 'aui-ss'
import mavonEditor from 'mavon-editor'
import store from './store'
import * as filters from './filters'
import 'element-ui/lib/theme-chalk/index.css'
import './style/theme-aui-ss.css'
import 'mavon-editor/dist/css/index.css'
import './style/lib/font-awesome-4.7.0/css/font-awesome.css'

Vue.use(AUISS)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(VueHtml5Editor, html5EditorConfig)

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 路由跳转前触发
router.beforeEach((to, from, next) => {
  next()
})

Vue.mixin(require('./mixins/event-mixin').default)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
