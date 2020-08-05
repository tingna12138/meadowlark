var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')

module.exports = {
  // 获取按月查询数据
  async getSiteRecordByMon (req, content) {
    // 查询条件年份
  var serRes = operMongoDB.find('site-hot', { date: new RegExp(`^${req.params.year}-.+`) })
  return toScript(serRes)
  },
  
  // 获取按日查询数据
  async getSiteRecordByDay (req, content) {
    // 查询条件月份
    var serRes = operMongoDB.find('site-hot', { date: new RegExp(`^\\d{4}-${req.params.month}-\\d{2}`) })
    return toScript(serRes)
  },
}