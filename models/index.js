var mongoose = require('mongoose')

module.exports = function (dataBase) {
  mongoose.connect(`mongodb://localhost/${dataBase}`, { useNewUrlParser: true, useUnifiedTopology: true })

  // 数据库连接失败
  db.on('error', console.error.bind(console, 'connection error:'))
  // 数据库连接成功
  db.once('open', function() {
    console.log('连接成功')
  })

  // ...进行数据操作
}