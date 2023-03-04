import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  askBing: (query: string, convo: {} ) => ipcRenderer.invoke('function:askBing', query, convo)
})