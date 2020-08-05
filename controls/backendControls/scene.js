var operMongoDB = require('../../models/responseModel')
var { toScript } = require('../../utils/util')

module.exports = {
  // 获取景点列表
  async getScene (req, content) {
    // 查询条件：pageSize\pageNum\scene\sort(所属分类)
  var res
  await operMongoDB.find('scene-list', { ...content }).then(serRes => {
    res = toScript(serRes)
  })
  return res
  },

  // 新增景点
  async addScene (req, content) {
    // 新增条件：名称（scene --必填）\分类（sort --默认0）\描述（descr --必）
    // 默认选项： collection(0) share(0)
    var addForm = { ...content }
    addForm.collection = 0
    addForm.share = 0
    var addRes = await operMongoDB.addData('scene-list', )
  }
}