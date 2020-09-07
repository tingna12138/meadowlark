var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')

module.exports = {
  // 获取按月查询数据
  async getSiteRecordByMon (req, content) {
    // 查询条件年份: 2020
    var res = await operMongoDB.find('site-hot', { date: new RegExp(`^${req.params.id}-.+`) })
    
    if (res.code === 500) {
      return {
        result: res,
        options: { statusCode: res.code}
      }
    }

    try {
      var months = []
      months.length = 12
      for (var i = 0; i < 12; i ++) {
        months[i] = {
          view: 0,
          share: 0,
          register: 0
        }
      }
      res.payload.forEach(day => {
        months[statiscMonth(day.date) - 1].view += Number(day.view)
        months[statiscMonth(day.date) - 1].share += Number(day.share)
        months[statiscMonth(day.date) - 1].register += Number(day.register)
      })
    } catch (err) {
      return {
        result: { code: 500, message: err },
        options: { statusCode: 500}
      }
    }

    return {
      result: {
        code: 200,
        message: '操作成功',
        payload: months
      },
      options: {
        statusCode: 200
      }
    }
  },
  
  // 获取按日查询数据
  async getSiteRecordByDay (req, content) {
    // 查询条件月份
    var query = req.query
    
    var res = await operMongoDB.find('site-hot', { date: new RegExp(`^${query.year}-${query.month}-\\d{2}`) })
    // return res
    return {result:res, options: { statusCode: res.code }}
  },
}

// 统计网站每月访问量， 参数day: 2020-01-02。返回不加0的某个月
function statiscMonth (day) {
  var regStr = `\\d{4}-(\\d{2})-\\d{2}`
  var reg =new RegExp(regStr)
  var matchRes = day.match(reg)
  for (var i = 1; i <= 12; i ++) {
    if (Number(matchRes[1]) === i) return i
  }
}