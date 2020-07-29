const socket = io('/')
const videoGrid = document.getElementById('video-grid')

// create new peer
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

const myVideo = document.createElement('video')
// mute my own audio
myVideo.muted =  true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    // answer call and send the stream
    myPeer.on('call', call => {
        call.answer(stream)
    // respond the stream
        const video =  document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

// as soon as connect to peer server and get an id, run this
myPeer.on('open', id =>{
    // sent an event to server
    socket.emit('join-room', ROOM_ID, id)
})



function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

// make call when new user connect to the stream
function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    // remove the video when someone leaves
    call.on('close', () => {
        video.remove()
    })
}