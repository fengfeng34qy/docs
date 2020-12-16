import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import CreateArticle from '@/components/CreateArticle'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/components/Home'),
          hidden: true
        }
      ]
    },
    {
      path: '/create',
      component: Layout,
      redirect: '/create/createArticle',
      mate: {
        title: '创建文章'
      },
      children: [
        {
          path: 'createArticle',
          name: 'CreateArticle',
          mate: {
            title: '创建文章'
          },
          title: '创建文章',
          component: () => import('@/components/CreateArticle'),
          hidden: true
        }
      ]
    }
  ]
})
