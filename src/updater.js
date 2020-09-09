const {autoUpdater} = require('electron-updater')
autoUpdater.logger=require('electron-log')
autoUpdater.logger.transports.file.level='info'

exports.check=()=>{
    console.log("checking for updates from updater");
    autoUpdater.checkForUpdates()
    autoUpdater.on('checking-for-update',()=>{
        console.log("wait we are checking for update")
    })
    autoUpdater.on('error',(error)=>{
      console.log(error)
    })
    autoUpdater.on('update-not-available',(error)=>{
      console.log("Sorry no updates were found")
    })
    autoUpdater.on('update-available',(error)=>{
      console.log("Updates Found")
    })
}