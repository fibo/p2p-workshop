
var hashToPort = require('hash-to-port')

function toAddress (username) {
  return username + '.local:' + hashToPort(username)
}

var register = require('register-multicast-dns')
var lookup = require('lookup-multicast-dns')

// Si puo usare questo hack per fare autodiscovery
// invece var lookup = require('lookup-multicast-dns')
var lookup = require('lookup-multicast-dns/global')

var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')


var username = process.argv[2]
var me = toAddress(username)
var friends = process.argv.slice(3)
var peers = friends.map(toAddress)

register(me)

  /*
friends.forEach(function (name) {
  var address = name + '.local'
  lookup(address, function (err, ip) {
    if (err) console.err(err)

    console.log('found ' + ip)
  })
})
*/

var swarm = topology(me, peers)
var connections = streamSet()
var received = {}

swarm.on('connection', function (socket, id) {
  console.log('info> direct connection to', id)

  socket = jsonStream(socket)
  socket.on('data', function (data) {
    console.log(data.toString().trim())

    if (data.seq <= received[data.from]) return // already received this one
    received[data.from] = data.seq
    console.log(data.username + '> ' + data.message)
    connections.forEach(function (socket) {
      socket.write(data)
    })
  })

  connections.add(socket)
})

var seq = 0
var id = Math.random()

process.stdin.on('data', function (data) {
  connections.forEach(function (socket) {
    var message = data.toString().trim()
    socket.write({from: id, seq: seq++, username: username, message: message})
  })
})

