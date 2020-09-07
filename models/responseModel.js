var mongoose = require('./index')
var schemaObj = require('./schemaList')
var operMongoDB = {}
var dataList = new Map()
var { toScript } = require('../utils/util')

  // 集合名称（必填）， 查询条件对象
  operMongoDB.find = async function (name, qoptions) {
    var result = {}
    var pageNum, pageSize
    var q_options = qoptions || {}

    if (q_options.pageNum) {
      pageNum = q_options.pageNum
      delete q_options.pageNum
    }

    if (q_options.pageSize) {
      pageSize = q_options.pageSize
      delete q_options.pageSize
    }
    
    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(schemaObj[name])
      dataList.set(name, mongoose.model(`${name}s`, Schema, name))
    }

    await new Promise ((resolve, rejection) => {
      try {
        dataList.get(name)
        .find(q_options)
        .skip(pageSize ? (Number(pageSize) + 1)*(pageNum - 1): 0)
        .limit(pageSize ? Number(pageSize) + 1 : '')
        .exec((err, data) => {
          if (err) {
            result.code = 500
            result.message = err
          } else {
            result.code = 200
            result.message = '操作成功'
            result.payload = toScript(data)
          }
          resolve(result)
        })
      } catch (err) {
        rejection(err)
      }
    }).catch(err => {
      result.code = 500
      result.message = err
    })
    return result
  }

  // 修改数据库。参数分别是：集合名称（必填）， 查询条件对象， 想要更改的选中字段的结果
  operMongoDB.update = async function (name, qoptions, resoptions) {
    var result = {}
    var q_options = qoptions || {}
    var res_options = resoptions || {}
    
    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(name)
      dataList.set(name, mongoose.model('', Schema, name))
    }

    try {
      await (dataList.get(name)).update(q_options, res_options, (err, num, info) => {
        if (err) {
          result.code = 500
          result.message = err
          return
        }
        result.code = 200
        result.message = '更新成功'
        result.payload = `一共有${num.nModified}条数据被更新`
      })
    } catch (err) {
      result.code = 500
      result.message = err
    }
    return result
  }

  // 向数据库中增加数据。 参数分别是： 集合名称，想要增加的文档对象
  operMongoDB.addData = async function (name, docoptions) {
    var result = {}
    var doc_options = docoptions || {}
    
    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(name)
      dataList.set(name, mongoose.model('', Schema, name))
    }
    
    var new_doc = await new (dataList.get(name))(doc_options)

    await new Promise ((resolve, rejection) => {
      try {
        new_doc.save((err, data) => {
          if (err) {
            result.code = 500
            result.message = err
            return
          }
          result.code = 200
          result.message = '新增成功'
          result.payload = toScript(data)
          resolve(result)
        })
      } catch (err) {
        rejection(err)
      }
    }).catch(err => {
      result.code = 500
      result.message = err
    })
    return result
  }

  // 删除数据库中的数据
  operMongoDB.remove = async function (name, revoptions) {
    var result = {}
    var rev_options = revoptions || {}

    // 排除这个集合已经定义model了
    if (!dataList.has(name)) {
      var Schema = mongoose.Schema(name)
      dataList.set(name, mongoose.model('', Schema, name))
    }
    try {
      await dataList.get(name).remove(rev_options, err => {
        if (err) {
          result.message = err
          result.code = 500
          return
        }
        result.message = '删除成功'
        result.code = 200
      })
    } catch (err) {
      result.code = 500
      result.message = err
    }
    return result
  }

  module.exports = operMongoDB


