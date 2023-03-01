import { app, ipcMain, globalShortcut, Tray } from 'electron';
import { getBingResponse } from './bing';
import { createMainWindow } from './window';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', () => {
  ipcMain.handle('function:askBing', getBingResponse)

  app.setActivationPolicy('accessory') // macOS only

  const mainWindow = createMainWindow();

  // open dev tools
  mainWindow.webContents.openDevTools();

  const toggleWindow = () => mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()

  const trayIcon = new Tray("assets/ClippyIconTemplate.png")
  trayIcon.addListener('click', () => toggleWindow())

  globalShortcut.register('CommandOrControl+Shift+6', () => toggleWindow())

  mainWindow.on('blur', () => mainWindow.hide())
  mainWindow.on('show', () => console.log("focus the chat input"))

});


// don't quit if all windows are closed
app.on('window-all-closed', (e: Event) => {
  e.preventDefault()
})

