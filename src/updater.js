const {autoUpdater} = require('electron-updater')
autoUpdater.logger=require('electron-log')
autoUpdater.logger.transports.file.level='info'

exports.check=()=>{
    console.log("checking for updates");
    autoUpdater.checkForUpdates()
    autoUpdater.on('checking-for-update',()=>{
        console.log("wait we are checking for update")
      })
      autoUpdater.on('error',(error)=>{
        console.log(error)
      })
}