var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')

module.exports = {
  // 获取景点列表
  async getSiteRecordByMon (req, content) {
    // 查询条件：pageSize\pageNum\sceneName\sceneSort(所属分类)
  var res
  await operMongoDB.find('scene-list', ).then(serRes => {
    res = toScript(serRes)
  })
  return res
  }
}