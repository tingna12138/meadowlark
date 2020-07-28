
var operMongoDB = require('../models/responseModel')
var addSelectedMenu = require('../utils/util').addSelectedMenu

module.exports = function (app) {
  // 后台登陆页面
  app.get('/admin(/login)?', (req, res) => {
    // 在这里进行是否登录判断：既判断发送的过来的请求中有没有带有效的token。
    // 1. 有token，就跳到site-hot
    // 2. 没有token, 就跳转到登陆页面

    res.render('backendPages/login', {layout: false})
  })

  // 网站热度
  app.get('/admin/:id', async (req, res) => {
    // 在这里进行是否登录判断：既判断发送的过来的请求中有没有带有效的token。
      // 1. 有token，就跳到对应的页面
      // 2. 没有token, 就跳转到登陆页面

    var route_id = req.params.id
    // var sideMenu = await operMongoDB.find('admin-menu').payload  undefined
    var menuData = await operMongoDB.find('admin-menu')
    // 数据库返回的键值对是： {"name": "景点管理"}格式，要做一个格式转换，否则无法在视图渲染
    var the_sideMenu = JSON.parse(JSON.stringify(menuData.payload))
    var sideMenu = addSelectedMenu(the_sideMenu, route_id)
    res.render(`backendPages/${route_id}`, {route: route_id, sideMenu})
  })
}