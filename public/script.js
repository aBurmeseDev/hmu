const socket = io('/')

// create new peer
const myPeer = new myPeer(undefined, {
    host: '/',
    port: '3001'
})

// sent an event to server
socket.emit('join-room', ROOM_ID, 10)

socket.on('user-connected', userId => {
    console.log('User connected' + userId)
})