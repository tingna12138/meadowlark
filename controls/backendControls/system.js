var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')

module.exports = {
  async getSystemLog (req, content) {
    var searchForm = {}
    content.operuser ? searchForm.operUser = content.operuser : ''

    var searRes = await operMongoDB.find('system-log',searchForm)
    searRes = toScript(searRes)
    if (searRes.code === 500 || (!content.startTime && !content.endTime && !content.operdes)) {
      return searRes
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
    return delRes
  },
  
  // 编辑菜单名称
  async editCategory (req, content) {
    if (content.index === undefined) {
      var operRes = await operMongoDB.update('admin-menu', { _id: content.id }, { name: content.name })
      return operRes
    }

    // 编辑二级菜单
    var serRes = await operMongoDB.find('admin-menu', {_id: content.id})
    serRes = toScript(serRes)
    serRes.children[content.index].name = content.name
    var editChildRes = await operMongoDB.update('admin-menu', { _id: content.id }, { children: serRes.children })
    return editChildRes
  },

  // 删除菜单
  async delCategory (req, content) {
    // 能不能一下子删除文档中的子元素  --不能
    // 一级菜单的id，如果有二级菜单，就返回二级菜单的index吧
    if (code === undefined) {
      var delRes = await operMongoDB.remove('admin-menu', {_id: content.id})
      return delRes
    }
    // 删除二级菜单
    var serRes = await operMongoDB.find('admin-menu', {_id: content.id})
    serRes = toScript(serRes)
    var child = serRes.children.splice(1, content.index)
    var delChildRes = await operMongoDB.update('admin-menu', { _id: content.id }, { children: child })

    return delChildRes
  },

  // 新增菜单
  async addCategory (req, content) {
    // 前端传入：菜单名（name）、代码（code）、id(用于判断添加一级还是二级菜单)
    // 后端写： selected（""）, isBlock(""), children([])
    if (content.id === undefined) {
      var addRes = operMongoDB.addData('admin-menu', { ...content })
      return addRes
    }

    var addObj = {
      name: content.name,
      code: content.code,
      isCurrent: ''
    }
    
    // 添加二级菜单
    var serRes = await operMongoDB.find('admin-menu', {_id: content.id})
    serRes = toScript(serRes)
    serRes.children.push(addObj)
  }
}