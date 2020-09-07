
var operMongoDB = require('../models/responseModel')
var addSelectedMenu = require('../utils/util').addSelectedMenu
var { toScript } = require('../utils/util')

module.exports = function (app) {
  // 后台登陆页面
  app.get('/admin(/login)?', (req, res) => {
    // 在这里进行是否登录判断：既判断发送的过来的请求中有没有带有效的token。
    // 1. 有token，就跳到site-hot
    // 2. 没有token, 就跳转到登陆页面

    res.render('backendPages/login', {layout: false})
  })
  
  // 按日获取网站访问量的页面
  app.get('/admin/site-hot/byDay', (req, res) => {
    res.render('backendPages/site-hot-day', {layout: false})
  })

  // 后台管理页面
  // '/admin/:id' 匹配不了 /admin/site-hot/bymonth
  app.get('/admin/:id', async (req, res) => {
    // console.log('传到后台管理页面的session', req.session.grade)
    var grade = req.session.grade
    // 获取菜单栏
    var route_id = req.params.id
    // var sideMenu = await operMongoDB.find('admin-menu').payload  undefined
    var menuData = await operMongoDB.find('admin-menu')
    // 数据库返回的键值对是： {"name": "景点管理"}格式，要做一个格式转换，否则无法在视图渲染
    var the_sideMenu = toScript(menuData.payload)
    var sideMenu = addSelectedMenu(the_sideMenu, route_id)

    // 获取用户信息
    var the_adminInfo = await operMongoDB.find('admin-list', {_id: req.session.userId})
    var adminInfo = toScript(the_adminInfo.payload)[0]
    res.render(`backendPages/${route_id}`, {route: route_id, sideMenu, adminInfo, name: 'hahahah', grade})
  })
}