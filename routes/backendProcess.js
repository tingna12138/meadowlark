var loginControl = require('../controls/backendControls/login')
var systemControl = require('../controls/backendControls/system')
var adminControl = require('../controls/backendControls/admin')
var siteControl = require('../controls/backendControls/site')
var sceneControl = require('../controls/backendControls/scene')

module.exports = function (rest) {
  rest.post('/backend/login', loginControl.fetchAdmin)  // 管理员登陆
  rest.post('/backend/logout', loginControl.loginOut)  // 退出登录
  rest.post('/backend/system/log/searchLog', systemControl.getSystemLog)  // 系统管理-系统日志-查询
  rest.post('/backend/system/log/delLog', systemControl.delSystemLog)  // 系统管理-系统日志-删除日志
  rest.post('/backend/system/category/editcate', systemControl.editCategory)  // 系统管理-菜单管理-编辑菜单
  rest.post('/backend/system/category/delcate', systemControl.delCategory)  // 系统管理-菜单管理-移除菜单
  rest.post('/backend/system/category/addcate', systemControl.addCategory)  // 系统管理-菜单管理新增菜单

  rest.get('/backend/admin/adminList/searchAdmin', adminControl.getAdminList)  // 管理员管理-查询管理员列表
  rest.post('/backend/admin/adminList/addAdmin', adminControl.addAdmin)  // 管理员管理-添加管理员
  rest.post('/backend/admin/adminList/delAdmin', adminControl.delAdmin)  // 管理员管理-删除管理员
  rest.post('/backend/admin/adminList/editAdmin', adminControl.editAdmin)  // 管理员管理-编辑管理员
  rest.get('/backend/admin/adminList/getGrade', adminControl.getGrade)  // 管理员管理-获取管理权限
  rest.post('/backend/admin/adminList/editGrade', adminControl.editGrade)  // 管理员管理-修改管理员权限


  rest.get('/backend/site/siteHot/byMonth', siteControl.getSiteRecordByMon)  // 网站管理-按月获取网站热度
  rest.get('/backend/site/siteHot/byDay', siteControl.getSiteRecordByDay)  // 网站管理-按日获取网站热度

  rest.get('/backend/scene/sceneList', sceneControl.getSiteRecordByDay)  // 景点管理-获取景点列表
}