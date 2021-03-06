
var streamSet = require('stream-set')
var net = require('net')

var activeSockets = streamSet()

var server = net.createServer(function (socket) {
  // when the socket ends/errors it will automatically be removed from the set
  activeSockets.add(socket)

  // will print "set size is 1"
  console.log('set size is', activeSockets.size)
  socket.on('close', function () {
    // will print "set size is 0"
    console.log('set size is', activeSockets.size)
  })
})

server.listen(10000)

