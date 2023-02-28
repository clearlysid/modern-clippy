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

async function getResponseFromBing(query: string) {
  const api = new BingChat({
    cookie: process.env.BING_COOKIE
  })
  const res = await api.sendMessage(query)
  return res.text
}

app.on('ready', () => {

   const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    minimizable: false,
    maximizable: false,
    frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
});