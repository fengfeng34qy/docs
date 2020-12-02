const Router = require('koa-router')
const { Language, User, Article, Home } = require('./controllers')

const router = new Router(); // 实例化路由

router.post('/post', ctx => {ctx.body = {data: '孙锋锋'}})

router.post('/home', Home.index)

// 添加语言模块接口
router.post('/addLanguage', Language.addLanguage)

// 查询语言模块接口
router.post('/getLanguages', Language.getLanguages)

// 注册接口
router.post('/signup', User.signup)

// 登录接口
router.post('/signin', User.signin)

// 获取用户信息接口
router.post('/getUserInfo', User.getUserInfo)

// 获取文章
router.post('/getArticle', Article.getArticle)

// 创建文章
router.post('/auth/addArticle', Article.addArticle)

// 删除文章
router.post('/delArticle', Article.delArticle)

module.exports = router