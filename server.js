var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.use(express.static(__dirname))

app.listen(port, function () {
  console.log('listening to ' + port)
})

app.get('/', function (req, res) {
  res.sendFile('index.html')
})
