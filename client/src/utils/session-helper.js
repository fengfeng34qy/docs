let session = {
  Client: {},
  Customer: {
    articles: [], // 文章列表
    languages: [], // 语言导航列表
    tags: [], // 最新文章的标签列表
    language: '', // 全局变量 - 当前选中激活的语言
    tag: '', // 全局变量 - 当前选中的标签
    content: '', // 全局变量 - 当前文章内容
    articleId: '' // 全局变量 - 当前选择的文章id
  }
}
export {
  session
}
