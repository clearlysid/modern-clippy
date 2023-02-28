import { app, BrowserWindow } from 'electron';
import { BingChat } from 'bing-chat'
import * as dotenv from 'dotenv'
dotenv.config()

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

async function getResponseFromBing() {
  const api = new BingChat({
    cookie: process.env.BING_COOKIE
  })

  const res = await api.sendMessage('Who is ben 10?')

  return res.text
}

app.on('ready', () => {

   const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // and load the index.html of the app.

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
