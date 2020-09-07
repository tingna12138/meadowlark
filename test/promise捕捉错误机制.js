
// 知识点一： 单纯的Promise不能进行错误捕捉，要配合try-catch使用

// new Promise((resolve, reject) => {
//   try {
//     var a = string  // 这一步出错，try语句块内后面的内容都不会执行，直接进入catch语句块
//     console.log(1111)
//     var b = a/5
//     resolve()
//   } catch(err) {
//     reject(err)
//   } finally {
//     console.log('完成状态')
//   }
// }).then(res => {
//   console.log('promise进入完成状态')
// }).catch(err => {
//   console.log('错误捕捉', err)
// })

// 知识点二： 在async函数中，如果存在异步操作，直接将异步操作放在try-catch语句块中，然后再异步操作前面加await关键字。程序还是会等异步操作执行完成后在向下继续执行
async function asynFun () {
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    }).then(res => {
      console.log(res)
    })
  } catch (err) {
    reject(err)
  }

  console.log(456)
}

asynFun()
/**
 * 打印结果：
 * 123
 * 456
 */