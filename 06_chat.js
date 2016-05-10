
var streamSet = require('stream-set')

var activeSockets = streamSet()
var jsonStream = require('duplex-json-stream')
var net = require('net')

var nick = process.argv[2]
var me = process.argv[3]
var peers = process.argv.slice(4)

var activeSockets = streamSet()

var topology = require('fully-connected-topology');

var t = topology(me, peers);

var socket

t.on('connection', function(connection, peer) {
  console.log('peer is connected to', peer)

  activeSockets.add(connection)

  socket = jsonStream(connection)

  socket.on('close', function () {
    console.log('set size is', activeSockets.size)
  })

  socket.on('data', function (data) {
    process.stdout.write(data.nick + ':' + data.message)
  })
})

process.stdin.on('data', function (message) {
  var data = {
    nick: nick,
    message: message.toString()
  }

  console.log('me:' + message)

  socket.write(data)
})

