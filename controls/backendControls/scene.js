var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')
var sendEmail = require('../../config/sendEmail')

module.exports = {
  // 获取景点列表
  async getScene (req, content) {
    // 查询条件：pageSize\pageNum\scene\sort(所属分类)
    var res = await operMongoDB.find('scene-list', { ...content })
    // return res
    return {result:res, options: { statusCode: res.code }}
  },

  // 新增景点
  async addScene (req, content) {
    // 新增条件：名称（scene --必填）\分类（sort --默认0）\描述（descr --必）
    // 默认选项： collection(0) share(0)
    var addRes = await operMongoDB.addData('scene-list', { ...content })

    // 添加景点成功后发送邮件给邮件定制的会员
    if (addRes.code === 200) {
      var emailSerRes = await operMongoDB.find('email-list')
      var emailList = toScript(emailSerRes.payload)

      var htmlStr = require('../../views/eamil-addscene.hbs')(data)
      sendEmail(emailList, htmlStr)
    }

    // return addRes
    return {result:addRes, options: { statusCode: addRes.code }}
  },

  // 编辑景点
  async editScene (req, content) {
    // 条件：名称（scene --必填）\分类（sort --默认0）\描述（descr --必）
    // 默认选项： collection(跟数据库中的值保持一致) share(跟数据库中的值保持一致)
    var editRes = await operMongoDB.update('scene-list', { _id: content.id }, { ...content })

    // return editRes
    return {result:editRes, options: { statusCode: editRes.code }}
  },

  // 删除景点
  async delScene (req, content) {
    // 条件：名称（scene --必填）\分类（sort --默认0）\描述（descr --必）
    // 默认选项： collection(跟数据库中的值保持一致) share(跟数据库中的值保持一致)
    var addRes = await operMongoDB.remove('scene-list', { _id: content.id })

    // return addRes
    return {result:addRes, options: { statusCode: addRes.code }}

  },

  // 获取景点分类
  async getSort (req, content) {
    // 查询条件: 无
    var res = await operMongoDB.find('scene-sort')
    return {result:res, options: { statusCode: res.code }}
  },

  // 添加景点分类
  async addSort (req, content) {
    // 新增条件：code(默认为0-由前端设定)  name(必填)
    var addRes = await operMongoDB.addData('scene-sort', { ...content })
    return {result:addRes, options: { statusCode: addRes.code }}
    // return addRes
  },

  // 编辑景点分类
  async editSort (req, content) {
    // 编辑条件：code(默认为0-由前端设定)  name(必填)
    var editRes = await operMongoDB.update('scene-sort', { _id: content.id }, { ...content })

    // return editRes
    return {result:editRes, options: { statusCode: editRes.code }}
  },

  // 删除景点分类
  async delSort (req, content) {
    var addRes = await operMongoDB.remove('scene-sort', { _id: content.id })
    // return addRes
    return {result:addRes, options: { statusCode: addRes.code }}
  },

  // 发布攻略
  async subTip (req, content) {
    // 新增条件：id \playTip
    var editRes = await operMongoDB.update('scene-sort', { _id: content.id }, { ...content })
    // return editRes
    return {result:editRes, options: { statusCode: editRes.code }}
  },
}