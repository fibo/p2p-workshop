
var jsonStream = require('duplex-json-stream')
var net = require('net')

var socket = jsonStream(net.connect(10000, 'localhost'))

var nick = process.argv[2]
console.log(nick)

process.stdin.on('data', function (message) {
  var data = {
    nick: nick,
    message: message.toString()
  }

  console.log('me:' + message)

  socket.write(data)
})

socket.on('data', function (data) {
  console.log(data)
  process.stdout.write(data.nick + ':' + data.message)
})

