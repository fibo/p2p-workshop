
var me = process.argv[2] // first argument is gonna be your own address
var peers = process.argv.slice(3) // the rest should be the peers you want to connect to

var topology = require('fully-connected-topology');

var t = topology(me, peers);

t.on('connection', function(connection, peer) {
    console.log('peer is connected to', peer)
})

