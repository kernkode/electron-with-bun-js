import { contextBridge, ipcRenderer } from 'electron';

// Exponer API segura al renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Ejemplo: enviar mensajes al main
  sendMessage: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data);
  },
  
  // Ejemplo: recibir mensajes del main
  onMessage: (channel: string, callback: (data: unknown) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
});