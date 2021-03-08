// Modules to control application life and create native browser window
const { app, BrowserWindow, remote } = require("electron");
const ipcMain = require("electron").ipcMain;
const path = require("path");
const client = require('discord-rich-presence')('818226121635397723');

 
client.updatePresence({
  details: 'Gregs Music Player',
  largeImageKey: 'main',
  instance: true,
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Radio Player",
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
    },
    titleBarStyle: "customButtonsOnHover",
    frame: false,
    resizable: false,
  });

  ipcMain.on("close-window", () => {
    mainWindow.close();
  });

  ipcMain.on("min-window", () => {
    mainWindow.minimize()
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.