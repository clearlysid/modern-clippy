import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  askBing: (query: string) => ipcRenderer.invoke('function:askBing', query),
	test: "hello world"
})