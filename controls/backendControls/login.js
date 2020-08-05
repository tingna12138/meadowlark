var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')

module.exports = {
  fetchAdmin: async (req, content) => {
    var res = {}
    var userInfo = {}
    // var queryRes = await operMongoDB.find('admin-list', {name: req.body.username})
    await operMongoDB.find('admin-list', {name: req.body.username}).then(queryRes => {
      queryRes = toScript(queryRes)

      // 数据库连接失败
      if (queryRes.code === 500) {
        res.code = queryRes.code
        res.message = '数据库连接失败'
        return
      }
  
      if (queryRes.payload.length === 0) {
        res.code = 400
        res.message = '用户名不存在'
        return
      }
      
      var hasUser = queryRes.payload.some( user => {
        if (user['password'] === req.body.password) {
          userInfo = {...user}
          return true
        }
      })
  
      if (!hasUser) {
        // 登录操作成功但是美哟对应用户应该响应什么状态码
        res.code = 400
        res.message = '密码错误'
        return
      }
      
      res.code = 200
      res.message = '登录成功'
      res.payload = {userId: userInfo._id}
  
      req.session.isLogin = true
      req.session.userId = userInfo._id
      req.session.grade = userInfo.grade
      return
    }).catch(err => {
      console.log('插叙出错了')
      res.code = 500
      res.message = '服务器出错了'
    })
    
    return res
  },

  // 退出登录
  loginOut: async function (req, content) {
     req.session.isLogin = false
     req.session.userId = ''
     req.session.grade = undefined
     return {code: 200, message: '退出成功'}
  }
}