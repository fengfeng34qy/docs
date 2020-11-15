import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateArticle from '@/components/CreateArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/CreateArticle', component: CreateArticle }
  ]
})
