const common = require('./common')
const fs = require('fs')
const path = require('path')

module.exports = function (rest) {
  rest.get({ path: '/test', version: '1.0.0' }, (req, context) => {
    // 行不通，no such file or directory, open 'C:\Users\123\Desktop\2020\7鏈圽express瀛︿範\public\assets\hello.txt'
    // return fs.createReadStream('../public/assets/hello.txt', { encoding: 'utf-8'})
    // 行不通，no such file or directory, open 'C:\assets\hello.txt'
    // return fs.createReadStream('/assets/hello.txt', { encoding: 'utf-8'})
    return fs.createReadStream(path.join(__dirname, '../public/assets/hello.txt'), { encoding: 'utf-8'})
  })

  rest.get({ path: '/special', protector: async function( req, res, pathname, path ){ 
    res.render('home')
  } }, async function (req, context) {
    return 'oks'
  })
 
  // 用connect返回的html文件
  rest.get('/twist', function( request, content ){
    return {result: fs.createReadStream(path.join(__dirname, '../public/assets/hello.html'), { encoding: 'utf-8'}), options: {headers: { ETag: "10c24bc-4ab-457e1c1f", 'Content-Type': 'text/html' } }}
})
}