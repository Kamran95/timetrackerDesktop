const { desktopCapturer } = require('electron')
const {  ipcMain  } = require('electron').remote
const io = require('socket.io-client');
const socket = io('http://103.123.112.149:5000', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'origins':"*",
        'Access-Control-Allow-Origin': '*',
    // "Access-Control-Allow-Headers": "Content-Type, Authorization,Access-Control-Allow-Origin",
        // "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true,
        'Access-Control-Allow-Methods': 'OPTIONS, GET,POST,PUT',
      }
    }
  }
  
});

const peerConnection=new RTCPeerConnection();
socket.on('offer',(message)=>{
  console.log('offer sent',message);
})
ipcMain.on('channel1',(e,arg)=>{
  
    desktopCapturer.getSources({types:['window', 'screen']},async (error,sources)=>{
        for (const source of sources) {
            console.log("yes",source.name)
            if (source.name == "Entire Screen") {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  audio: false,
                  video: {
                    mandatory: {
                      chromeMediaSource: 'desktop',
                      chromeMediaSourceId: source.id,
                      minWidth: 1280,
                      maxWidth: 1280,
                      minHeight: 720,
                      maxHeight: 720
                    }
                  }
                })
                handleStream(stream)
              } catch (e) {
                handleError(e)
              }
              return
            }
          }
    })
    function handleStream (stream) {
      
        console.log("stream data",stream);
        peerConnection.addStream(stream)
        peerConnection.createOffer()
        // socket.emit('my event',peerConnection.localDescription)
        .then(sdp=>peerConnection.setLocalDescription(sdp))
        .then(()=>{
            socket.emit('offer',peerConnection.localDescription)
            console.log("emitted",peerConnection.localDescription);
            console.log('peerConnection',peerConnection.localDescription)
        })
        const video = document.querySelector('video')
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
      }
      socket.on('answer',(message)=>{
        console.log('answer recieved',message);
        peerConnection.setRemoteDescription(message)
      })
      function handleError (e) {
        
        console.log(e)
      }
})