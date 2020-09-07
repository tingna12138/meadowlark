var operMongoDB = require('../../models/responseModel')
// var { toScript } = require('../../utils/util')

module.exports = {
  async getSystemLog (req, content) {
    var searchForm = {}
    content.operuser ? searchForm.operUser = content.operuser : ''
    var searRes = await operMongoDB.find('system-log',searchForm)
    
    if (searRes.code === 500 || (!content.startTime && !content.endTime && !content.operdes)) {
      // return searRes
      return {result:searRes, options: { statusCode: searRes.code }}
    }
    searchList = []
    var tomorn = (new Date()).getTime() + 24*60*60*1000
    var startTime = content.startTime ? (new Date(content.startTime + ' 00:00:00')).getTime() : new Date('1970-01-01').getTime()
    var endTime = content.endTime ? (new Date(content.endTime + ' 23:59:59')).getTime() : new Date(tomorn).getTime()
    if (searRes.payload && searRes.payload.length > 0) {
      searRes.payload.forEach(log => {
        var operTime = (new Date(log.operTime)).getTime()
        if (operTime >= startTime && operTime <= endTime && log.operDes.match(content.operdes)) searchList.push(log)
      })
    }
    return {
      code: 200,
      message: '操作成功',
      payload: searchList
    }
  },
  
  // 删除日志
  async delSystemLog (req, content) {
    var delRes = await operMongoDB.remove('system-log', { _id: { $in: content.ids }})
    // return delRes
    return {result:delRes, options: { statusCode: delRes.code }}
  },

  // 获取菜单列表
  async getCategory (req, content) {
    var searRes = await operMongoDB.find('admin-menu')
    return {result:searRes, options: { statusCode: searRes.code }}
  },

  // 获取单条菜单数据
  async getSingCategory (req, content) {
    var query = req.query
    var searRes = await operMongoDB.find('admin-menu', { _id: query._id })
    return {result:searRes, options: { statusCode: searRes.code }}
  },
  
  // 编辑菜单名称
  async editCategory (req, content) {
    console.log(1111, content)
    if (!content.index) {
      var operRes = await operMongoDB.update('admin-menu', { _id: content._id }, { name: content.name, code: content.code })
      return {result:operRes, options: { statusCode: operRes.code }}
    }

    // // 编辑二级菜单
    var serRes = await operMongoDB.find('admin-menu', {_id: content._id})
    var child = serRes.payload[0].children
    child[content.index].name = content.name
    child[content.index].code = content.code
    var editChildRes = await operMongoDB.update('admin-menu', { _id: content._id }, { children: child })
    return editChildRes
  },

  // 删除菜单
  async delCategory (req, content) {
    // 能不能一下子删除文档中的子元素  --不能
    // 一级菜单的id，如果有二级菜单，就返回二级菜单的index吧
    if (content.delIndex === undefined) {
      var delRes = await operMongoDB.remove('admin-menu', {_id: content._id})
      // return delRes
    return {result:delRes, options: { statusCode: delRes.code }}
    }

    // 删除二级菜单
    var serRes = await operMongoDB.find('admin-menu', {_id: content._id})
    if (serRes.code === 500) return {result:serRes, options: { statusCode: serRes.code }}

    if (!serRes.payload || !serRes.payload === 0) return {result: '服务器异常', options: { statusCode: 500 }}
    var child = serRes.payload[0].children
    child.splice(content.delIndex, 1)
    var delChildRes = await operMongoDB.update('admin-menu', { _id: content._id }, { children: child })

    // return delChildRes
    return {result:delChildRes, options: { statusCode: delChildRes.code }}

  },

  // 新增菜单
  async addCategory (req, content) {
    // 前端传入：菜单名（name）、代码（code）、id(用于判断添加一级还是二级菜单)
    // 后端写： selected（""）, isBlock(""), children([])
    var addForm = {}
    var addRes
    
    // 新增一级菜单
    if (!content._id) {
      addForm = {
        name: content.name,
        code: content.code,
        selected: '',
        isBlock: '',
        children: []
      }

      addRes = await operMongoDB.addData('admin-menu',addForm)
      // return addRes
    return {result:addRes, options: { statusCode: addRes.code }}
    }

    // 添加二级菜单
    addForm = {
      name: content.name,
      code: content.code,
      isCurrent: ''
    }

    var serRes = await operMongoDB.find('admin-menu', {_id: content._id})
    if (serRes.code === 500) return {result:serRes, options: { statusCode: serRes.code }}

    if (!Array.isArray(serRes.payload) || serRes.payload.length === 0) {
      return { result: '服务器异常', options: { statusCode: 500 }}
    }

    var payload = serRes.payload
    payload[0].children.push(addForm)
    var addRes = await operMongoDB.update('admin-menu', {_id: content._id}, {children: payload[0].children})
    if (addRes.code === 200) {
      return {
        code: addRes.code,
        message: '操作成功',
        payload: 1
      }
    } else {
      return {
        result: {
          code: addRes.code,
          message: addRes.message,
          payload: 0
        },
        options: {
          statusCode: addRes.code
        }
      }
    }
  }
}