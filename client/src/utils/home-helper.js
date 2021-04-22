import { session } from './session-helper'

export default {
  // 设置主页左侧文章列表
  getArticle (m, t, f) {
    if (f === 'tag' && t) {
      // 点击了标签
      session.Customer.tag = t
    } else if (f === 'nav') {
      // 点击了nav
      session.Customer.language = m
      t = '全部'
    }
    let articles = session.Customer.articles
    let result = []
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].module === m) {
        if (t === '全部') {
          result.push(articles[i])
        } else {
          if (articles[i].tag === t) {
            result.push(articles[i])
          }
        }
      }
    }
    return result
  }
}
