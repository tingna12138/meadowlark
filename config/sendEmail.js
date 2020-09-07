var nodemailer = require('nodemailer')
var start = Date.now();
var smtpConfig = {
    host: 'smtp.163.com',
    // host: 'imap.163.com',
    // port: 993,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'lovlygir@163.com',
        pass: 'UMEJQLHEVKQWDVPE'
    }
};
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

console.log("After send mail:"+Date.now())
console.log(Date.now() - start)

// 第一个参数是接收邮件的地址列表，第二个参数是要发送的html字符串
module.exports = function (emailList, html) {
  emailList = emailList || []

  // 发送邮件
  emailList.forEach(email => {
    transporter.sendMail({
      from: 'lovlygir@163.com', // sender address
      to: email.email,
      subject: 'Thank You for Book your Trip with Meadowlark',
      html,
      generateTextFromHtml: true
    }, function(err){
      // 添加到错误日志
      if(err) console.error('Unable to send confirmation: ' + err.stack)
    })
  })
}


