const socket = io('/')

// create new peer
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

// as soon as connect to peer server and get an id, run this
myPeer.on('open', id =>{
    // sent an event to server
    socket.emit('join-room', ROOM_ID, id)
})


socket.on('user-connected', userId => {
    console.log('User connected: ' + userId)
})