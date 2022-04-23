import { app, ipcMain, dialog } from 'electron'
import fs from 'fs'

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("export-json", (event, arg) => {
  const path = app.getPath("userData") + "/config.json"
  const file = fs.readFileSync(path)

  var options = {
    title: "Save exported JSON",
    defaultPath : "kanban_exported_data.json",
    buttonLabel : "Save",

    filters :[
        {name: 'json', extensions: ['json']},
        {name: 'All Files', extensions: ['*']}
    ]
  };

  dialog.showSaveDialog(null, options).then(({ filePath }) => {
      fs.writeFileSync(filePath, file, 'utf-8');
  });
})

// Load here all startup windows
require('./mainWindow')

const ElectronStore = require('electron-store');
ElectronStore.initRenderer();

