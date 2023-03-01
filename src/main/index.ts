import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { BingChat } from 'bing-chat'
import * as dotenv from 'dotenv'
dotenv.config()

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

async function getBingResponse(_event:Electron.IpcMainEvent, query: string) {
  const api = new BingChat({
    cookie: process.env.BING_COOKIE
  })
  const res = await api.sendMessage(query)
  return res
}

app.on('ready', () => {
  ipcMain.handle('function:askBing', getBingResponse)
  
  const mainWindow = new BrowserWindow({
    width: 800,
    title: "Cortana X",
    height: 600,
    show: false,
    center: true,
    alwaysOnTop: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    hiddenInMissionControl: true,
    skipTaskbar: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // open dev tools
  mainWindow.webContents.openDevTools();

  globalShortcut.register('CommandOrControl+Shift+6', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
});

