var operMongoDB = require('../../models/responseModel')

module.exports = {
  // 查询管理员列表
  async getAdminList (req, content) {
    // 查询条件包括： 管理员名称、等级、角色（可以不要）
    var res
    await operMongoDB.find('admin-list', { ...req.param }).then(serRes => {
      res = serRes
    }) 
    return {result:res, options: { statusCode: res.code }}
  },
  
  // 新增管理员
  async addAdmin (req, content) {
    // 名称、密码、等级（前面三个必填），角色名（选填）
    var addRes = operMongoDB.addData('admin-list', { ...content })
    // return addRes
    return {result:addRes, options: { statusCode: addRes.code }}
  },
  
  // 删除管理员
  async delAdmin (req, content) {
    var delRes = operMongoDB.remove('admin-list', { _id: content.id })
    // return delRes
    return {result:delRes, options: { statusCode: delRes.code }}
  },

  // 编辑管理员
  async editAdmin (req, content) {
    var editRes = operMongoDB.update('admin-list', { _id: content.id }, { ...content })
    // return editRes
    return {result:editRes, options: { statusCode: editRes.code }}
  },

  // 获取管理权限
  async getGrade (req, content) {
    var res
    await operMongoDB.find('admin-grades').then(serRes => {
      res = serRes
    })
    // return res
    return {result:res, options: { statusCode: res.code }}
  },

  // 编辑管理权限
  async editGrade (req, content) {
    var editRes = operMongoDB.update('admin-grades', { _id: content.id }, { scare: content.scare })
    // return editRes
    return {result:editRes, options: { statusCode: editRes.code }}
  }
}