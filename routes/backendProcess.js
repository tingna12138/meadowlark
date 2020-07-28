var loginControl = require('../controls/backendControls/login')

module.exports = function (rest) {
  rest.post('/backend/login', loginControl.fetchAdmin)
}