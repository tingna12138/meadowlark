var mongoose = require('./index')
var operMongoDB = {}
var dataList = new Map()
// var { } = require('../utils/util')

  // 集合名称（必填）， 查询条件对象，定义集合结构的对象)
  operMongoDB.find = async function (name, qoptions, options) {
    var result = {}
    var sche_options = options || {}
    var q_options = qoptions || {}
    
    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(sche_options)
      dataList.set(name, mongoose.model(`${name}s`, Schema, name))
    }

    await dataList.get(name).find(q_options, (err, data) => {
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

  // 修改数据库。参数分别是：集合名称（必填）， 查询条件对象， 想要更改的选中字段的结果, 定义集合结构的对象
  operMongoDB.update = async function (name, qoptions, resoptions, options) {
    var result = {}
    var sche_options = options || {}
    var q_options = qoptions || {}
    var res_options = resoptions || {}
    
    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(sche_options)
      dataList.set(name, mongoose.model('', Schema, name))
    }

    await dataList.get(name).update(q_options, res_options, (err, num, info) => {
      if (err) {
        result.code = 500
        result.message = err
        return
      }
      result.code = 200
      result.message = '更新成功'
      result.payload = `一共有${num.nModified}条数据被更新`
    })
    return result
  }

  // 向数据库中增加数据。 参数分别是： 集合名称，想要增加的文档对象，集合映射
  operMongoDB.addData = async function (name, docoptions, options) {
    var result = {}
    var sche_options = options || {}
    var doc_options = docoptions || {}
    
    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(sche_options)
      dataList.set(name, mongoose.model('', Schema, name))
    }

    var new_doc = await new dataList.get(name)(doc_options)
    new_doc.save((err, data) => {
      if (err) {
        result.code = 500
        result.message = err
        return
      }
      result.code = 200
      result.message = '新增成功'
      result.payload = data
    })
    return result
  }

  // 删除数据库中的数据
  operMongoDB.remove = async function (name, revoptions, options) {
    var result = {}
    var sche_options = options || {}
    var rev_options = revoptions || {}

    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(sche_options)
      dataList.set(name, mongoose.model('', Schema, name))
    }
    await dataList.get(name).remove(rev_options, err => {
      if (err) {
        result.message = err
        result.code = 500
        return
      }
      result.message = '删除成功'
      result.code = 200
    })
    return result
  }

  module.exports = operMongoDB


