
var net = require('net')

var client = net.Socket()

client.connect(3000, '127.0.0.1', function () {

  process.stdin.on('data', function (data) {
    client.write(data)
  })


  // or use also
  // client.on('data', function (data) {
  process.stdout.on('data', function (data) {
    console.log(data.toString())
  })
})

