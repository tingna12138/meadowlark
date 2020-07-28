var operMongoDB = require('../../models/responseModel')

module.exports = {
  fetchAdmin: async (req, content) => {
    // content 里面包含请求带过来的参数
    // 获取管理员数据表
    var returnList = await operMongoDB.find('admin-list', {name: content.username})

    // 当用户名和密码都符合要求的时候，设置session
    console.log(11111, returnList.payload)
    return '登录成功'
  },
}