
module.exports = function (app) {
  // 后台登陆页面
  app.get('/admin(/login)?', (req, res) => {res.render('backendPages/login', {layout: false})})

  // 网站热度
  app.get('/admin/:id', (req, res) => {
    console.log(11111, req.params.id)
    res.render('backendPages/site-hot', {route: req.params.id})
  })

}