var mongoose = require('mongoose')

  // 建立链接
  mongoose.connect(`mongodb://localhost/meadowlark`, { useNewUrlParser: true, useUnifiedTopology: true })
  var db = mongoose.connection
  // 数据库连接失败
  db.on('error', console.error.bind(console, 'connection error:'))
  // 数据库连接成功
  db.once('open', function() {
    console.log('连接成功')
  })

  module.exports = mongoose