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

  rest.get('/backend/system/category/getcate', systemControl.getCategory)  // 系统管理-菜单管理-获取菜单列表
  rest.get('/backend/system/category/getcate/single', systemControl.getSingCategory)  // 系统管理-菜单管理-获取菜单列表
  rest.post('/backend/system/category/editcate', systemControl.editCategory)  // 系统管理-菜单管理-编辑菜单
  rest.post('/backend/system/category/delcate', systemControl.delCategory)  // 系统管理-菜单管理-移除菜单
  rest.post('/backend/system/category/addcate', systemControl.addCategory)  // 系统管理-菜单管理新增菜单

  rest.get('/backend/admin/adminList/searchAdmin', adminControl.getAdminList)  // 管理员管理-查询管理员列表
  rest.post('/backend/admin/adminList/addAdmin', adminControl.addAdmin)  // 管理员管理-添加管理员
  rest.post('/backend/admin/adminList/delAdmin', adminControl.delAdmin)  // 管理员管理-删除管理员
  rest.post('/backend/admin/adminList/editAdmin', adminControl.editAdmin)  // 管理员管理-编辑管理员
  rest.get('/backend/admin/adminList/getGrade', adminControl.getGrade)  // 管理员管理-获取管理权限
  rest.post('/backend/admin/adminList/editGrade', adminControl.editGrade)  // 管理员管理-修改管理员权限


  rest.get('/backend/site/siteHot/byMonth/:id', siteControl.getSiteRecordByMon)  // 网站管理-按月获取网站热度
  rest.get('/backend/site/siteHot/byDay', siteControl.getSiteRecordByDay)  // 网站管理-按日获取网站热度

  rest.get('/backend/scene/sceneList/getScene', sceneControl.getScene)  // 景点管理-获取景点列表
  rest.post('/backend/scene/sceneList/addScene', sceneControl.addScene)  // 景点管理-新增景点
  rest.post('/backend/scene/sceneList/editScene', sceneControl.editScene)  // 景点管理-编辑景点
  rest.post('/backend/scene/sceneList/delScene', sceneControl.delScene)  // 景点管理-移除景点

  rest.get('/backend/scene/sort/getSort', sceneControl.getSort)  // 景点管理-获取景点分类列表
  rest.post('/backend/scene/sort/addSort', sceneControl.addSort)  // 景点管理-新增景点分类
  rest.post('/backend/scene/sort/editSort', sceneControl.editSort)  // 景点管理-编辑景点分类
  rest.post('/backend/scene/sort/delSort', sceneControl.delSort)  // 景点管理-移除景点分类
}