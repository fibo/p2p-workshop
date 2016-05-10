
var jsonStream = require('duplex-json-stream')

var streamSet = require('stream-set')
var net = require('net')

var activeSockets = streamSet()

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)

  // when the socket ends/errors it will automatically be removed from the set
  activeSockets.add(socket)

  socket.on('data', function(data) {
    console.log(data.nick + ':' + data.message)

    activeSockets.forEach(function (socket) {
      socket.write(data)
    })
  })

  socket.on('close', function () {
    console.log('set size is', activeSockets.size)
  })
})

server.listen(10000)

