import { ipcRenderer } from 'electron'

export default {
  askBing: (query: string, convo: {} ) => ipcRenderer.invoke('function:askBing', query, convo),
  hideWindow: () => ipcRenderer.send('function:hideWindow'),
  reloadWindow: () => ipcRenderer.send('function:reloadWindow'),
}