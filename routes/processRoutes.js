var backendProcess = require('./backendProcess') 
var frontProcess = require('./frontProcess') 

module.exports = function (rest) {
  frontProcess(rest)
  backendProcess(rest)
}