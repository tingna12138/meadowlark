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
  }
}