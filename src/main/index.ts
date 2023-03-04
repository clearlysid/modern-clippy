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
  trayIcon.addListener('right-click', () => app.quit())

  globalShortcut.register('CommandOrControl+Shift+6', () => toggleWindow())
  globalShortcut.register('CommandOrControl+Shift+7', () => app.quit())

  // mainWindow.on('blur', () => mainWindow.hide())
});


// don't quit if all windows are closed
app.on('window-all-closed', (e: Event) => {
  e.preventDefault()
})

