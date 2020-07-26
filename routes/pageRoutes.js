var frontPages = require('./frontPages')
var backendPages = require('./backendPages') 

module.exports = function (app) {
  frontPages(app)
  backendPages(app)
}