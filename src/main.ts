import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
    // Usar app.getAppPath() que siempre apunta a la raíz del proyecto
    const appPath = app.getAppPath();
    
    console.log('App Path:', appPath); // Para debug
    
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // Usar ruta absoluta desde la raíz del proyecto
            preload: path.join(appPath, 'dist', 'preload.js')
        }
    });

    // HTML también desde la raíz del proyecto
    mainWindow.loadFile(path.join(appPath, 'src-ui', 'index.html'));

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Esperar a que la app esté lista antes de crear la ventana
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});