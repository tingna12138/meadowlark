module.exports = {
  // 处理管理员界面的菜单数据
  addSelectedMenu : function (menu, id) {
    menu.some((item, index) => {
      for (var i = 0; i < item.children.length || 0; i ++) {
        if (item.children[i].code === id) {
          menu[index].selected = 'selected'
          menu[index].isBlock = 'display:block'
          menu[index].children[i].isCurrent = 'current'
        }
      }
    })
    return menu
  },

  // 转换数据库返回数据的格式
  toScript (data) {
    return JSON.parse(JSON.stringify(data))
  },

  // 响应状态码
  RES_200: {
    code: 200,
    message: '操作成功'
  },
  RES_400: {
    code: 400,
    message: '请求参数错误'
  },
  RES_401: {
    code: 401,
    message: '当前用户没有权限'
  },
  RES_403: {
    code: 403,
    message: '服务器拒绝处理请求'
  },
  RES_404: {
    code: 404,
    message: '没有找到对应的资源'
  },
  RES_405: {
    code: 405,
    message: '请求方法与对应资源不符'
  },
  RES_500: {
    code: 500,
    message: '服务器出错'
  }
}