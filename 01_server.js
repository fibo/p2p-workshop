
var net = require('net')

var server = net.createServer(function (c) {
  c.on('data', function (data) {
    c.write(data)
  })
})

server.listen(3000)

