// 数据库映射

module.exports = {
  // 景点列表
  'scene-list': {
    scene: String,
    sort: 0,
    descr: String,
    brief: String,
    playTip: '',
    collect: 0,
    share: 0
  },

  // 景点分类
  'scene-sort': {
    code: 0,
    name: String
  },
  
  // 管理员等级
  'admin-grades': {
    grade: Number,
    scare: Array
  },

  // 管理员列表
  'admin-list': {
    name: String,
    password: String,
    grade: Number,
    role: String
  },

  // 菜单列表
  'admin-menu': {
    name: String,
    code: String,
    selected: '',
    isBlock: '',
    children: []
  },

  // 网站热度
  'site-hot': {
    date: String,
    view: String,
    share: String,
    register: String
  },

  // 系统日志
  'system-log': {
    type: Number,
    operDes: String,
    operUser: String,
    operTime: String,
    operIp: String
  },

  // 邮件定制列表
  'email-list': {
    email: String,
    date: String
  }
}