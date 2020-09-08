const { desktopCapturer } = require('electron')
import axios from 'axios'
import store from '../../store'
const {  ipcMain  } = require('electron').remote
const fs= require('fs')
const os=require('os')
const path= require('path')
const shell= require('electron').shell
ipcMain.on('channel2',(e,arg)=>{
    setInterval(()=>{screenshots()},5000)
        
})
function screenshots(){
    
    // console.log('token is',token)
    console.log("in screenshot")
    desktopCapturer.getSources({types:['window', 'screen'], thumbnailSize : {width:1920,height:1080}},async (error,sources)=>{
        if(error) return console.log(error.message)
        sources.forEach((source)=>{
                if(source.name =="Entire Screen" || source.name =="Screen 1" ){
                    
                    const screenshotpath = path.join(os.tmpdir(),'screenshot.jpeg')
                    axiosRequest(source.thumbnail)
                    fs.writeFile(screenshotpath,source.thumbnail.toJPEG(100),(err)=>{
                            if(err) return console.log(err.message)
                            // shell.openExternal('file://'+screenshotpath ) 
                            console.log("screen shot saved to "+screenshotpath )
                    })
                }
        })
    })
}
function axiosRequest(img){
    let image=img.toDataURL()
    let Convertedimage =b64toBlob(image)
    console.log("to data url" , Convertedimage)
    // const canvas=document.createElement('canvas')
    // const ctx=canvas.getContext('2d')
    // canvas.width=100
    // canvas.height=200
    // ctx.drawImage(img.toPNG(),0,0,canvas.width,canvas.height)
    // let blob = new Blob(image, {type: 'image/jpeg'});
    const file = new File(img.toJPEG(100), "capture.jpeg", {
        type: 'image/jpeg'
    });
    document.getElementById("screenshot").src=img.toDataURL()
    const formdata = new FormData();
    let token=store.getters["getToken"]
    
    formdata.append("file",Convertedimage,"screenshot.jpeg");
    formdata.append("active", true);
    formdata.append("worklogid", 25);
    formdata.append("related", "y");
    console.log("img in axios",img)
    return new Promise(function (resolve, reject) {
        const options = {
          headers: {
            'Content-Type':'multipart/form-data',
            Authorization: "Bearer " + token
          }
        };
        axios({
          method: 'POST',
          url: '/worksnap',
          params:null ,
          data: formdata,
          headers: options.headers,
  
    })
    .then((res)=>{
        console.log(res)
    //   resolve(res)
    })
    .catch((err)=>{
        console.log(err)
    //   reject(err)
    })
  });
}
function b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}