var express = require('express')  // 服务器搭建
var exphbs = require('express-handlebars') // 视图模板
var path = require('path')
var bodyParse = require('body-parser') // 处理post请求体
var Rest = require('connect-rest')  // 为http请求提供公共前缀
var session = require('express-session') // 用于验证用户是否登录

// 路由
var pageRoutes = require('./routes/pageRoutes')
var processRoutes = require('./routes/processRoutes')

// 创建服务
var app = express()
app.set('port', process.env.PORT || 5000)

// 使用中间件
app.use(bodyParse.json()) // 支持 json 格式
// 使用第三方插件 qs 来处理
app.use(bodyParse.urlencoded({extended : true}))

//配置session
app.use(session({
  //设置随机码
  secret:'abced12',
  resave:false,
  saveUninitialized:false
}))

// 为请求路径添加公共前缀
var apiOptions = {
  context: '/api',
  domain: require('domain').create()
}
var rest = Rest.create(apiOptions)
// 将rest API连入管道
app.use(rest.processRequest())

// 设置默认引擎
var handlebars = exphbs.create({
  default: 'main',
  extname: '.hbs',
  helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
  }
})
app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

// 设置静态资源目录
app.use(express.static(path.join(__dirname, '/public')))

// 开启并监听服务
app.listen(app.get('port'), () => {
  console.log(`express server is running at http://localhost:${app.get('port')}`)
})

app.use((req, res, next) => {
  console.log(1234567890, req.path, req.session.isLogin)
  // 后台管理系统登陆验证
  if (/^\/admin(\/login)?$/.test(req.path) && req.session.isLogin) {
    console.log('lalalal')
    res.redirect('/admin/site-hot')
  } else if (/^\/admin.+/.test(req.path) && !req.session.isLogin) {
    res.redirect('/admin')
  } else {
    next()
  }
})

pageRoutes(app)
processRoutes(rest)

// 定制404页面
app.use((req, res) => {
  res.status(404)
  res.render('404', { layout: false })
})

// 定制500页面
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500)
  res.render('500', { layout: false })
})
