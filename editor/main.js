// Modules to control application life and create native browser window
const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

let template = [

  {
    label: "Application",
    submenu: [
      { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
    ]
  },
  {
    label: "编辑",
    submenu: [
      { label: "复制", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "粘贴", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    ]
  },
  {
    label: '文件',
    submenu: [{
      label: '保存',
      accelerator: 'CmdOrCtrl+S',
      click: function () {
        var content = JSON.stringify({
          keysList: this.keysList,
          eventsList: this.eventsList,
          itemsLists: this.itemsLists,
          actionsList: this.actionsList,
          animatesList: this.animatesList
        });
        var filename = "project.json";
        var blob;
        var eleLink = document.createElement("a");
        if ("download" in eleLink) {
          eleLink.download = filename;
          eleLink.style.display = "none";
          blob = new Blob([content]);
          eleLink.href = window.URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        } else {
          //浏览器兼容
          blob = new Blob([content]);
          window.navigator.msSaveOrOpenBlob(blob, filename);
        }
      }
    }]
  },
  {
    label: '窗口',
    submenu: [{
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }, {
      type: 'separator'
    }, {
      label: '重新打开窗口',
      accelerator: 'CmdOrCtrl+Shift+T',
      enabled: false,
      key: 'reopenMenuItem',
      click: function () {
        app.emit('activate')
      }
    }]
  },
  {
    label: '菜单'
  }
]

function createWindow() {


  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', function () {
  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
