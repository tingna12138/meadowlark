var mongoose = require('./index')
var dataList = 0

// 集合名称（必填）， 查询条件对象，定义集合结构的对象)
module.exports = {
  find: async function (name, qoptions, options) {
    var result = {}
    var sche_options = options || {}
    var q_options = qoptions || {}
    var Schema = mongoose.Schema(sche_options)
    var collection_name = mongoose.model('', Schema, name)
    await collection_name.find(q_options, (err, data) => {
      if (err) {
        result.code = 500
        result.message = err
        return
      }
      result.code = 200
      result.message = '操作成功'
      result.payload = data
    })
    return result
  }
}
